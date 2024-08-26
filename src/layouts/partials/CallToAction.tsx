import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: any;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section
          className="section-sm bg-primary-dark dark:bg-primary-light"
          id="callToAction"
        >
          <div className="container">
            <div className="text-center">
              <h2
                dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                className="mb-6 text-light dark:text-dark"
              />
              <p
                dangerouslySetInnerHTML={markdownify(
                  data.frontmatter.description,
                )}
                className="mb-12 text-primary-light dark:text-dark w-[60%] mx-auto"
              />
              {data.frontmatter.button.enable && (
                <Link
                  className="btn btn-primary hover:ring"
                  href={data.frontmatter.button.link}
                >
                  {data.frontmatter.button.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
