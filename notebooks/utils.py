import numpy as np
import openclimate as oc
import pandas as pd

def actor_parts(actor_id: str, part_type: str='adm1') -> pd.DataFrame:
    """get the name and actor ID of all children of a parent actor ID
    
    Parameters
    ----------
    actor_id : str
        name of actor
    part_type : str (default: adm1)
        part type to look for

    Returns
    -------
    actor_parts : pd.DataFrame
        pandas dataframe with name and actor_id of parts
    """
    try:
        df_parts = (
            oc.Client()
            .parts(actor_id=actor_id, part_type=part_type)
            .loc[:, ['name', 'actor_id']]
            .reset_index(drop=True)
        )
        
        df_actor = (
            oc.Client()
            .search(query=actor_id)
            .loc[lambda x: x['actor_id']==actor_id, ['name', 'actor_id']]
        )
        
        return pd.concat([df_actor, df_parts])
    
    except AttributeError:
        print(f'ERROR: {actor_id} not found')
        return None
    except KeyError:
        print(f'{actor_id} does not have any {part_type} types')
        return None

    
def get_target(actor_id, year: int = 2030, data_id = None):
    """get target for actor_id
    
    Parameters
    ----------
    actor_id : str
        name of actor
    datasource_id: str 
        identifier for the datasource you want to pull from

    Returns
    -------
    df_emissions : pd.DataFrame
        pandas dataframe with emissions data 
    """
    #data_id = 'C2ES:canadian_GHG_targets' if data_id is None else data_id
    try:
        part_targets = (
            oc.Client().targets(actor_id = actor_id, ignore_warnings=True)
            .loc[lambda x: x['target_type'] == 'Absolute emission reduction', 
                 ['actor_id', 'baseline_year', 'target_year', 'target_value', 'target_unit', 'datasource_id']]
        ) 
        
        #part_target = part_targets.loc[part_targets['datasource_id']== data_id]
        
        closest_target = part_targets['target_year'][part_targets['target_year'] == year].min()
        cols_out = ['actor_id', 'baseline_year', 'target_year','target_value', 'target_unit']
        target = (
            part_targets
            .loc[part_targets['target_year'] == closest_target, cols_out]
            .drop_duplicates()
        )
        return target
    except:
        return None
    
    
def get_emissions(actor_id: str, datasource_id: str) -> pd.DataFrame:
    """get emission data for actor ID from particular datasource ID
    units of total_emissions is tonnes of CO2-equivalents 
    
    Parameters
    ----------
    actor_id : str
        name of actor
    datasource_id: str 
        identifier for the datasource you want to pull from

    Returns
    -------
    df_emissions : pd.DataFrame
        pandas dataframe with emissions data 
    """
    client = oc.Client()
    client.jupyter
    try:
        return client.emissions(actor_id=actor_id, datasource_id=datasource_id)
    except ValueError:
        return None
    
    
def ipcc_range(df, 
               actor_id: str = None, 
               baseline_year: int = 2019, 
               target_value15: float = 43, 
               target_value20: float = 27
) -> dict:
    """emissions required to be in line with AR6 
    1.5C : 43% reduction from 2019 levels by 2030
    2.0C : 27% reduction from 2019 levels by 2030
    
    Parameters
    ----------
    df : pd.dataframe
        dataframe with emissions
    actor_id: str 
        code for actor you want emissions from
        only relevant if multiple actors in the dataframe
    baseline_year : int
        baseline year for the targets (default: 2019)
    target_value15 : float
        target percent to meet 1.5C pathway (default: 43%)
    target_value20 : float
        target percent to meet 2.0C pathway (default: 27%)

    Returns
    -------
    dict_out : dict
        dictionary with inputs and target emissions in same units as df
        
    Source
    -------
    https://www.ipcc.ch/report/ar6/wg3/downloads/report/IPCC_AR6_WGIII_SPM.pdf
    see section C.1.1

    Notes
    -----
    PDF of source is here. https://www.ipcc.ch/site/assets/uploads/sites/2/2022/06/SPM_version_report_LR.pdf
    targets can be found in paragraph 2 of section 2.3.3.1
    """
    if actor_id is None:
        baseline_emissions = (
            df
            .loc[lambda x: x['year'] == baseline_year, 'total_emissions']
            .item()
        )
    else:
        baseline_emissions = (
            df
            .loc[lambda x: x['actor_id'] == actor_id]
            .loc[lambda x: x['year'] == baseline_year, 'total_emissions']
            .item() 
        )
        
    target_15 = baseline_emissions * (1 - target_value15/100)
    target_20 = baseline_emissions * (1 - target_value20/100)

    return {'baseline_year': baseline_year, 
            'target_value_1.5C': target_value15, 
            'target_emissions_1.5C': target_15,
            'target_value_2.0C': target_value20, 
            'target_emissions_2.0C': target_20,
           }


def linear_equation(baseline_year, baseline_emissions, target_percent, target_year):
    target_decimal = target_percent / 100
    target_emissions = baseline_emissions * (1 - target_decimal)
    d_emission = target_emissions - baseline_emissions
    d_year = target_year - baseline_year
    slope = d_emission / d_year
    intercept = baseline_emissions - slope * baseline_year
    equation = lambda YEAR: (slope * YEAR) + intercept
    return {'slope': slope, 'intercept': intercept, 'target_emissions': target_emissions, 'equation': equation}


def scaled_emissions(baseline_year, baseline_emissions, target_percent, target_year, scale_year):
    INPUTS_DICT = dict(
        baseline_year = baseline_year,
        baseline_emissions = baseline_emissions,
        target_percent = target_percent,
        target_year = target_year,
    )

    le = linear_equation(**INPUTS_DICT)

    return le['equation'](scale_year)


def pledged_reduction(baseline_emissions: float, 
                     reduction_pledged: float,
                     *args, **kwargs
) -> float:
    """pledged reduction from baseline year
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent

    Returns
    -------
    target_emissions : float
        expected emissions in target year
    """
    assert reduction_pledged > 0, f"ERROR: reduction_pledged must be positive ({reduction_pledged})"
    assert baseline_emissions > 0, f"ERROR: baseline_emissions must be positive ({baseline_emissions})"
    reduction_decimal = reduction_pledged / 100
    return baseline_emissions * reduction_decimal


def target_emissions(baseline_emissions: float, 
                     reduction_pledged: float,
                     *args, **kwargs
) -> float:
    """expected emissions in target year
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent

    Returns
    -------
    target_emissions : float
        expected emissions in target year
    """
    assert reduction_pledged > 0, f"ERROR: reduction_pledged must be positive ({reduction_pledged})"
    assert baseline_emissions > 0, f"ERROR: baseline_emissions must be positive ({baseline_emissions})"
    reduction_decimal = reduction_pledged / 100
    return baseline_emissions - (baseline_emissions * reduction_decimal)

def reduction_achieved(baseline_emissions: float, 
                       inventory_emissions: float, 
                       *args, **kwargs
) -> float:
    """reduction achieved from baseline
    
    * positive values indcates emission were reduced from baseline
    * negative values indcate emissions increases from baseline
    
    Parameters
    ----------
    inventory_emissions : float
        current emissions value
    baseline_emissions : float
        emissions in baseline year

    Returns
    -------
    emissions_change : float
        change in emissions from baseline
    """
    return baseline_emissions - inventory_emissions


def left_to_reduce(
    baseline_emissions: float, 
    reduction_pledged: float, 
    inventory_emissions: float,
    *args, **kwargs
) -> float:
    """reduction that is left to reduct
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent
    inventory_year : int
        year inventory emissions occured

    Returns
    -------
    left_to_reduct : float
        emissions needed to reduce to meet goal
    """
    T = target_emissions(
        baseline_emissions = baseline_emissions, 
        reduction_pledged = reduction_pledged
    )
    return inventory_emissions - T

def annual_reduction(
    baseline_emissions: float,
    baseline_year: int,
    reduction_pledged: float, 
    inventory_year: int,
    target_year: int,
    *args, **kwargs
) -> float:
    """reduction required to be on track for goal
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    baseline_year : int
        year baseline emissions occured
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent
    inventory_year : int
        year inventory emissions occured
    target_year : int
        year target is to be achieved

    Returns
    -------
    reduction_required : float
        reduction required to be on track for goal
    """
    assert target_year >= inventory_year, f"ERROR: target_year must be greater than inventory_year"
    assert inventory_year >= baseline_year, f"ERROR: inventory_year must be greater than baseline_year"
    target = target_emissions(
        baseline_emissions = baseline_emissions, 
        reduction_pledged = reduction_pledged
    )
    delta_emission = target - baseline_emissions
    delta_year = target_year - baseline_year
    return abs(delta_emission / delta_year)
    
    
def reduction_required(baseline_emissions: float,
                       baseline_year: int,
                       reduction_pledged: float, 
                       inventory_year: int,
                       target_year: int,
                       *args, **kwargs
) -> float:
    """reduction required to be on track for goal
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    baseline_year : int
        year baseline emissions occured
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent
    inventory_year : int
        year inventory emissions occured
    target_year : int
        year target is to be achieved

    Returns
    -------
    reduction_required : float
        reduction required to be on track for goal
    """
    assert target_year >= inventory_year, f"ERROR: target_year must be greater than inventory_year"
    assert inventory_year >= baseline_year, f"ERROR: inventory_year must be greater than baseline_year"
    
    reduction_per_year = annual_reduction(
        baseline_emissions = baseline_emissions,
        baseline_year = baseline_year,
        reduction_pledged = reduction_pledged, 
        inventory_year = inventory_year,
        target_year = target_year,
    )
    
    dt = inventory_year - baseline_year
    return reduction_per_year * dt


def progress_rate(baseline_emissions: float,
                  baseline_year: int,
                  reduction_pledged: float, 
                  inventory_year: int,
                  inventory_emissions: float,
                  target_year: int,
                  *args, **kwargs
) -> float:
    """progress rate as a decimal
    
    * negatives values indacate trending in wrong direction
    * positive values between [0,1) indcates ratio of required reduction achieved
    * values equal to 1 indicates perfectly on track required reduction
    * values greater than one indicates emission greater than required
    
    these are easier to think about as a percentrage
    
    Parameters
    ----------
    baseline_emissions : float
        emissions in baseline year
    baseline_year : int
        year baseline emissions occured
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent
    inventory_year : int
        year inventory emissions occured
    inventory_emissions : float
        emissions in inventory year
    target_year : int
        year target is to be achieved

    Returns
    -------
    reduction_required : float
        reduction required to be on track for goal
    """
    assert target_year >= inventory_year, f"ERROR: target_year must be greater than inventory_year"
    assert inventory_year >= baseline_year, f"ERROR: inventory_year must be greater than baseline_year"
    achieved = reduction_achieved(
        baseline_emissions = baseline_emissions, 
        inventory_emissions = inventory_emissions
    )
    required = reduction_required(
        baseline_emissions = baseline_emissions,
        baseline_year = baseline_year,
        reduction_pledged = reduction_pledged, 
        inventory_year = inventory_year,
        target_year = target_year
    )
    return achieved / required


def percentage_reduction(inventory_emissions: float, 
                         baseline_emissions: float,
                         reduction_pledged: float,
                         *args, **kwargs
) -> float:
    """percentage reduction required for the actor to achieve the target
    
    Parameters
    ----------
    inventory_emissions : float
        current emissions value
    baseline_emissions : float
        emissions in baseline year
    reduction_pledged : float
        percentage of reduction from baseline values, as a percent


    Returns
    -------
    percentage_reduction : float
        percentage reduction required for the actor to achieve the target
    """
    target = target_emissions(
        baseline_emissions = baseline_emissions, 
        reduction_pledged = reduction_pledged
    )
    return ((inventory_emissions - target) / inventory_emissions) * 100


def annualized_percentage_reduction(percentage_reduction: float, 
                                    inventory_year: int, 
                                    target_year: int,
                                    *args, **kwargs
) -> float:
    """percentage reduction required for the actor to achieve the target
    
    Parameters
    ----------
    percentage_reduction : float
        percentage reduction required for the actor to achieve the target
    inventory_year : int
        year of invenotry
    target_year : int
        year target is to be achieved

    Returns
    -------
    annualized_percentage_reduction : float
        percentage reduction per year
    """
    assert target_year >= inventory_year, f"ERROR: target_year must be greater than inventory_year"
    return percentage_reduction / (target_year - inventory_year)


def create_data_dict(actor_id: str, datasource_id: str) -> dict:
    """creates a dictionary of data for actor and datasource
    
    Parameters
    ----------
    actor_id : st
        string of actor id
    datasource_id : str
        string of datasrouce

    Returns
    -------
    dict
        dictionary with actor data
    """
    try:
        df_emissions = get_emissions(actor_id = actor_id, datasource_id=datasource_id)
        df_target = get_target(actor_id = actor_id).sort_values(by='baseline_year').reset_index().iloc[-1].to_frame().T
        n_rows = len(df_target)

        baseline_year = df_target['baseline_year'].item()
        reduction_pledged = float(df_target['target_value'].item())
        target_year = df_target['target_year'].item()
        baseline_emissions = df_emissions.loc[df_emissions['year'] == baseline_year, 'total_emissions'].item()
        inventory_year = df_emissions['year'].max()
        inventory_emissions = df_emissions.loc[df_emissions['year'] == inventory_year, 'total_emissions'].item()

        DATA = dict(
            actor_id = actor_id,
            baseline_emissions = baseline_emissions,
            baseline_year = baseline_year,
            reduction_pledged = reduction_pledged, 
            inventory_emissions = inventory_emissions, 
            inventory_year = inventory_year,
            target_year = target_year,
        )

        target_emissions_value = target_emissions(**DATA)
        progress_rate_value = progress_rate(**DATA) * 100
        percentage_reduction_value = percentage_reduction(**DATA)
        reduction_achieved_value = reduction_achieved(**DATA)
        reduction_required_value = reduction_required(**DATA)

        DATA['target_emissions'] = target_emissions_value
        DATA['progress_rate'] = progress_rate_value
        DATA['percentage_reduction'] = percentage_reduction_value
        DATA['reduction_achieved'] = reduction_achieved_value
        DATA['reduction_required'] = reduction_required_value
        
        return DATA
    except IndexError:
        DATA = dict(
            actor_id = actor_id,
            baseline_emissions = None,
            baseline_year = None,
            reduction_pledged = None,
            inventory_emissions = None, 
            inventory_year = None,
            target_year = None,
            target_emissions = None,
            progress_rate = None,
            percentage_reduction = None,
            reduction_achieved = None,
            reduction_required = None
        )   
        return DATA
    except AttributeError:
        DATA = dict(
            actor_id = actor_id,
            baseline_emissions = None,
            baseline_year = None,
            reduction_pledged = None,
            inventory_emissions = None, 
            inventory_year = None,
            target_year = None,
            target_emissions = None,
            progress_rate = None,
            percentage_reduction = None,
            reduction_achieved = None,
            reduction_required = None
        )   
        return DATA