"use client";

import Heading from "@/components/typography/Heading";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import Hero from "@/components/header/Hero";
import ButtonMain from "@/components/button/Button";

const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const page = () => {
  return (
    <>
      <Hero>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          gap="24px">
          <ButtonMain
            text="API DOCUMENTATION"
            bgColor="#24BE00"
            textColor="#FFFFFF"
            border={false}
            borderColor="#24BE00"
            w="216px"
            h="48px"
          />
          <ButtonMain
            text="PYTHON CLIENT API ACCESS"
            bgColor="none"
            textColor="#24BE00"
            border={true}
            borderColor="#24BE00"
            w="269px"
            h="48px"
          />
        </Box>
      </Hero>
      <Box paddingTop="64px" paddingBottom="24px">
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="24px">
            <Heading
              titleHighlighted="Our Journey: "
              titleDark="A Story of Innovation with the OpenClimate API "
              color=""
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
                lineHeight: {
                  xs: "16px",
                  md: "24px",
                },
              }}
              variant="body2"
              fontFamily="sans-serif"
              lineHeight="16px"
              letterSpacing="0.5px">
              The primary goal of DIGS (Digitally Enabled Independent Global
              Stocktake) is to illustrate the vast potential of utilizing
              OpenClimate data for multifaceted climate analysis. At the core of
              this initiative, we harness the OpenClimate API—a comprehensive
              and reliable source of emissions data and nationally determined
              contributions (NDCs)—to conduct a detailed examination of national
              and subnational climate targets and actions. DIGS serves as a
              tangible example of how OpenClimate data can be transformed into
              valuable insights. By comparing national emissions reduction
              targets with the collective ambitions of subnational actors, our
              analysis sheds light on the alignment, or lack thereof, between
              different governance levels. This approach surfaces critical
              information about the gaps that exist between national ambitions
              and the sum of subnational efforts. For data and policy analysts,
              DIGS offers a rich template for further exploration. Our
              methodologies, openly documented, are invitations for others to
              refine our analyses, introduce new perspectives, and continue the
              quest for understanding and action in the global response to
              climate change.
            </Typography>
            <ul className="list-none ml-2 list-inside text-xs">
              <li>
                <Link
                  href="/"
                  className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    API documentation
                  </Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#2351DC] flex items-center gap-2 font-[600]">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Python Client that access API
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
        </div>
      </Box>
      <Box paddingBottom="24px">
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="24px">
            <Heading
              titleHighlighted="What is a "
              titleDark="Digitally-enabled Independent Global Stocktake (DIGS)?"
              color=""
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
                lineHeight: {
                  xs: "16px",
                  md: "24px",
                },
              }}
              variant="body2"
              fontFamily="sans-serif"
              lineHeight="16px"
              letterSpacing="0.5px">
              The Paris Agreement set up a five-yearly check-in, called the
              Global Stocktake (GST), to see how nations are doing on their
              climate commitments. However, there are gaps in this system: many
              countries struggle with old-fashioned methods of tracking their
              progress, and lots of important players, Non-State actors, like
              cities and companies aren&apos;t included at all. The
              Digitally-enabled Independent Global Stocktake (DIGS) is a new
              effort to bring modern digital infrastructure tools, like data
              from satellites, interoperability standards and advanced
              amdorithms, to track everyone&apos;s progress, especially for
              cities and companies. By using these tools, the DIGS vision is to
              make the whole process more open, trustworthy, and efficient. It's
              about making sure everyone&apos;s efforts count and pushing the
              world closer to its climate goals.
            </Typography>
            <ul className="list-none ml-2 list-inside text-xs">
              <li>
                <Link
                  href="https://uploads-ssl.webflow.com/62192ceb9199b3dd08431a6b/63288ad5701afc27ed83d2ef_Litepaper%20-%20A%20Digitally-Enabled%20Independent%20Global%20Stocktake.pdf"
                  className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Read the DIGS Litepaper
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
        </div>
      </Box>
      <Box
        paddingBottom="24px"
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
        }}>
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="24px">
            <Heading
              titleHighlighted="Target Gaps: "
              titleDark="A case study for Canada and Great Britain"
              color=""
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
                lineHeight: {
                  xs: "16px",
                  md: "24px",
                },
              }}
              variant="body2"
              fontFamily="sans-serif"
              lineHeight="16px"
              letterSpacing="0.5px">
              Our recent paper, “Target Gaps: A case study for Canada and Great
              Britain” by Lucas Gloege, Evan Prodromou, and Martin Wainstein,
              dives into the intricate dynamics between national and subnational
              actors. This study evaluates how closely aligned each
              country&apos;s NDC is with the emissions cuts required by the
              Paris Agreement. The findings revealed stark contrasts: Canada:
              Most Canadian provinces have emissions target goals, but the
              aggregate of these subnational goals overshoots Canada&apos;s
              national target by 144 MtCO2e, highlighting a need for better
              coordination. Great Britain: In contrast, all countries within
              Great Britain have their own emission targets that align with the
              nationally determined targets and are in line with the IPCC goals.
              While both Canada and Great Britain have NDCs that are ambitious
              enough to meet the 2.0°C IPCC goal, our analysis indicates that
              they may fall short of the more stringent 1.5°C goal.
            </Typography>
            <ul className="list-none ml-2 list-inside text-xs">
              <li>
                <Link
                  href="https://docs.google.com/document/u/0/d/1hA8246oEDPvzs_6RJAe8PEJyYjm_X4FNFAevc-kUYR8/edit?pli=1"
                  className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Read full paper
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
        </div>
      </Box>
      <Box
        paddingBottom="24px"
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
        }}>
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="24px">
            <Heading
              titleHighlighted="Call to Action for Data and Policy Analysts: "
              titleDark="Shape the Future of Climate Analysis"
              color=""
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
                lineHeight: {
                  xs: "16px",
                  md: "24px",
                },
              }}
              variant="body2"
              fontFamily="sans-serif"
              lineHeight="16px"
              letterSpacing="0.5px">
              The insights we&apos;ve unearthed through our stocktaking analyses
              are just the starting point. We invite you to delve into the data
              yourself—whether to validate, extend, or challenge our findings.
              Here&apos;s your opportunity: Enhance our analyses with additional
              layers of data or new methodologies. Forge new paths with
              innovative stocktaking projects of your own. Engage with policy
              recommendations, informed by precise and reliable data. Our tools
              and datasets are at your disposal, free and open for use. Start
              your own journey with the OpenClimate API and play a role in
              sculpting a more informed, effective approach to global climate
              action.
            </Typography>
            <ul className="ml-2 list-inside text-xs">
              <li>
                <Link
                  href="https://docs.google.com/document/d/1hA8246oEDPvzs_6RJAe8PEJyYjm_X4FNFAevc-kUYR8/edit"
                  className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Read full paper
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
        </div>
      </Box>
      <Box
        paddingBottom="24px"
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}>
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <div className="grid grid-cols-2 gap-[48px]">
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              justifyContent="space-between">
              <Heading
                titleHighlighted="Target Gaps: "
                titleDark="A case study for Canada and Great Britain"
                color=""
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                  lineHeight: {
                    xs: "16px",
                    md: "24px",
                  },
                }}
                variant="body2"
                fontFamily="sans-serif"
                lineHeight="16px"
                letterSpacing="0.5px">
                Our recent paper, “Target Gaps: A case study for Canada and
                Great Britain” by Lucas Gloege, Evan Prodromou, and Martin
                Wainstein, dives into the intricate dynamics between national
                and subnational actors. This study evaluates how closely aligned
                each country’s NDC is with the emissions cuts required by the
                Paris Agreement. The findings revealed stark contrasts:
              </Typography>
              <ul className="list-disc ml-8 -mt-5 list-outside bodyText text-[12px] md:text-[16px] leading-[24px] text-xs">
                <li className="flex gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Canada: Most Canadian provinces have emissions target goals,
                    but the aggregate of these subnational goals overshoots
                    Canada&apos;s national target by 144 MtCO2e, highlighting a
                    need for better coordination.{" "}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Great Britain: In contrast, all countries within Great
                    Britain have their own emission targets that align with the
                    nationally determined targets and are in line with the IPCC
                    goals.{" "}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Engage with policy recommendations, informed by precise and
                    reliable data.{" "}
                  </Typography>
                </li>
              </ul>
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                  lineHeight: {
                    xs: "16px",
                    md: "24px",
                  },
                }}
                variant="body2"
                fontFamily="sans-serif"
                marginTop="-24px"
                lineHeight="16px"
                letterSpacing="0.5px">
                While both Canada and Great Britain have NDCs that are ambitious
                enough to meet the 2.0°C IPCC goal, our analysis indicates that
                they may fall short of the more stringent 1.5°C goal.
              </Typography>
              <ul className="list-none ml-2 list-inside text-xs md:text-base">
                <li>
                  <Link
                    href="https://docs.google.com/document/d/1hA8246oEDPvzs_6RJAe8PEJyYjm_X4FNFAevc-kUYR8/edit"
                    className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                    <span>&bull;</span>
                    <Typography
                      variant="body2"
                      className="underline"
                      fontFamily="sans-serif"
                      color="text-[#2351DC]"
                      sx={{
                        fontSize: {
                          xs: "12px",
                          md: "16px",
                        },
                      }}>
                      Read full paper
                    </Typography>
                  </Link>
                </li>
              </ul>
            </Box>
            <Box display="flex" flexDirection="column" gap="24px">
              <Heading
                titleHighlighted="Call to Action for Data and Policy Analysts: "
                titleDark="Shape the Future of Climate Analysis"
                color=""
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                  lineHeight: {
                    xs: "16px",
                    md: "24px",
                  },
                }}
                variant="body2"
                fontFamily="sans-serif"
                lineHeight="16px"
                letterSpacing="0.5px">
                The insights we&apos;ve unearthed through our stocktaking
                analyses are just the starting point. We invite you to delve
                into the data yourself—whether to validate, extend, or challenge
                our findings. Here’s your opportunity:
              </Typography>
              <ul className="list-disc ml-8 -mt-5 list-outside bodyText text-[12px] md:text-[16px] leading-[24px] text-xs">
                <li className="flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Enhance our analyses with additional layers of data or new
                    methodologies.{" "}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Forge new paths with innovative stocktaking projects of your
                    own.{" "}
                  </Typography>
                </li>
                <li className="flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Engage with policy recommendations, informed by precise and
                    reliable data.{" "}
                  </Typography>
                </li>
              </ul>
              <Typography
                marginTop="-24px"
                sx={{
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                  lineHeight: {
                    xs: "16px",
                    md: "24px",
                  },
                }}
                variant="body2"
                fontFamily="sans-serif"
                lineHeight="16px"
                letterSpacing="0.5px">
                Our tools and datasets are at your disposal, free and open for
                use. Start your own journey with the OpenClimate API and play a
                role in sculpting a more informed, effective approach to global
                climate action.
              </Typography>
              <ul className="list-none ml-2 list-inside text-xs md:text-base">
                <li>
                  <Link
                    href="https://uploads-ssl.webflow.com/62192ceb9199b3dd08431a6b/63288ad5701afc27ed83d2ef_Litepaper%20-%20A%20Digitally-Enabled%20Independent%20Global%20Stocktake.pdf"
                    className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                    <span>&bull;</span>
                    <Typography
                      variant="body2"
                      className="underline"
                      fontFamily="sans-serif"
                      color="text-[#2351DC]"
                      sx={{
                        fontSize: {
                          xs: "12px",
                          md: "16px",
                        },
                      }}>
                      Read the DIGS Litepaper
                    </Typography>
                  </Link>
                </li>
              </ul>
            </Box>
          </div>
        </div>
      </Box>
      <Box height="152px" width="100%" bgcolor="#E6E7FF" paddingTop="24px">
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="20px">
            <Typography
              variant="h2"
              color="#2351DC"
              fontSize="24px"
              fontWeight={600}
              lineHeight="32px">
              Get started now
            </Typography>
            <ul className="list-none ml-2 list-inside text-xs md:text-base">
              <li>
                <Link
                  href="https://github.com/Open-Earth-Foundation/OpenClimate/blob/develop/api/API.md"
                  className="text-[#2351DC] font-[600] leading-6 flex items-center gap-2">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    API documentation
                  </Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="https://openclimate-pyclient.readthedocs.io/en/latest/"
                  className="text-[#2351DC] flex items-center gap-2 font-[600] leading-6">
                  <span>&bull;</span>
                  <Typography
                    variant="body2"
                    className="underline"
                    fontFamily="sans-serif"
                    color="text-[#2351DC]"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}>
                    Python Client that access API
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          paddingTop: {
            xs: "24px",
            md: "48px",
          },
          height: {
            xs: "200px",
            md: "250px",
          },
        }}>
        <div className="max-w-[1440px] mx-auto px-[16px]">
          <Box display="flex" flexDirection="column" gap="24px">
            <Typography
              align="center"
              variant="h2"
              color="#008600"
              sx={{
                fontSize: {
                  xs: "24px",
                  lg: "32px",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
              fontWeight={600}
              lineHeight="32px">
              Get started now
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
                lineHeight: {
                  xs: "16px",
                  md: "24px",
                },
              }}
              variant="body2"
              fontFamily="sans-serif"
              lineHeight="16px"
              letterSpacing="0.5px">
              If you have any inquiries or require further clarification on the
              DIGS documentation, please don&apos;t hesitate to reach out to us
              at{" "}
              <Link
                href="mailto:greta@openearth.org"
                className="text-[#2351DC]">
                greta@openearth.org
              </Link>
              . We&apos;re here to help and assist with any questions you may
              have.
            </Typography>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default page;
