import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";
import React from "react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const About = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section
          className="section-sm bg-primary-dark dark:bg-primary-light"
          id="about"
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div className="mb-10 md:col-5 2xl:col-5 lg:col-4 md:order-2 md:mb-0">
                <ImageFallback
                  className="rounded-2xl"
                  src={data.frontmatter.image}
                  height={480}
                  width={520}
                  alt="cta-image"
                />
              </div>
              <div className="2xl:col-6 md:col-7 md:order-1">
                {data.frontmatter.button.enable && (
                  <Link
                    className="btn btn-primary rounded-3xl mb-8 hover:ring"
                    href={data.frontmatter.button.link}
                  >
                    {data.frontmatter.button.label}
                  </Link>
                )}
                {data.frontmatter.description.map((item, index: number) => (
                  <React.Fragment key={index}>
                    <h2
                      dangerouslySetInnerHTML={markdownify(item.title)}
                      className="mb-2 text-light dark:text-dark"
                    />
                    <p
                      dangerouslySetInnerHTML={markdownify(item.content)}
                      className="mb-6 text-light dark:text-dark"
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
