'use client'

import React, {FC} from "react"

interface HeroProps {
    title?: string,
    description: string,
    headerTextSize?: string
}

const TextBox:FC<HeroProps> = ({description, title, headerTextSize}) => {
    const [pageTitle, setPageTitle] = React.useState<string[] | undefined>([])
    React.useEffect(()=> {
    const modifiedTitle = title?.split(" ")
    setPageTitle(modifiedTitle)
   }, [title])

    return(
        <div className="
            h-38
            w-full
            flex
            items-center
        ">
            <div className='flex flex-col justify-center h-full'>
                <h1>
                    {
                        pageTitle?.map((val) => (
                            <span
                                key={val}
                                className={`
                                    font-bold
                                    ${ headerTextSize == "large" ? "text-4xl" : " text-3xl"}
                                    ${ pageTitle.lastIndexOf(val) == 2 ? "text-black": "text-[#008600]"}
                                `}
                            >
                                {val}&nbsp;
                            </span>
                        )) 
                    }
                </h1>
                <p className="w-full font-light py-10">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default TextBox;
