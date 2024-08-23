import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import Link from "next/link";
import React from "react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: any;
}

const QA = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section-sm bg-gradient" id="qa">
          <div className="container">
            <h1 className="text-center mb-4">{data.frontmatter.title}</h1>
            <p className="text-base text-center text-gray-500 mb-4">
              {data.frontmatter.description}
            </p>
            <div className="row justify-between">
              <div className="mb:md-0 mb-6 md:col-5">
                <ImageFallback
                  src={data.frontmatter.image}
                  className="rounded-2xl"
                  height={480}
                  width={520}
                />
              </div>
              <div className="md:col-7 lg:col-6">
                {/* Q&A Collapsible */}
                {data.frontmatter.qa.map((item: any, index: number) => (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="text-start">
                      <h4
                        className="py-4"
                        dangerouslySetInnerHTML={markdownify(item.question)}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      <p
                        className="mb-8 text-lg"
                        dangerouslySetInnerHTML={markdownify(item.answer)}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default QA;
