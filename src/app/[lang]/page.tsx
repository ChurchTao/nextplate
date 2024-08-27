import languages from "@/config/language.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import About from "@/partials/About";
import QA from "@/partials/QA";
import Features from "@/partials/Features";
import { Button } from "@/types";
import Link from "next/link";
import path from "path";
import { FaCheck } from "react-icons/fa";
import ApplyForm from "@/components/ApplyForm";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}

const Home = async ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const base_url = process.env.SITE_URL;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );
  const testimonial = getListPage(
    path.join(language.contentDir, "sections/testimonial.md"),
  );
  const about = getListPage(
    path.join(language.contentDir, "sections/about.md"),
  );
  const qa = getListPage(path.join(language.contentDir, "sections/qa.md"));
  const callToAction = getListPage(
    path.join(language.contentDir, "sections/call-to-action.md"),
  );
  const { frontmatter } = homepage;
  const {
    banner,
    positions,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    positions: any[];
    features: any[];
  } = frontmatter;

  return (
    <>
      <SeoMeta baseUrl={base_url} />
      <section className="section pt-14 bg-gradient">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-center">
              <h1
                className="mb-4 text-h3 lg:text-h1"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <Link
                  className="btn btn-primary"
                  href={banner.button!.link}
                  target={
                    banner.button!.link.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener"
                >
                  {banner.button!.label}
                </Link>
              )}
            </div>
            {banner.image && (
              <div className="col-12">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto rounded-xl"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section-sm bg-gradient" id="apply">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <h1 className="mb-8 text-h3 lg:text-h1 text-center">
                Apply for Your Job Today!
              </h1>
              <ApplyForm lang={lang} baseUrl={base_url || ""} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm bg-gradient" id="position">
        <h1 className="mb-8 text-h2 lg:text-h1 text-center">
          Available Position
        </h1>
        {positions.map((item, index: number) => (
          <div
            className={`container ${index !== positions.length - 1 ? "mb-16" : ""}`}
            key={index}
          >
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={item.image}
                  className="rounded-2xl"
                  height={480}
                  width={520}
                  alt={item.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(item.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(item.content)}
                />
                <ul>
                  {item.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {item.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={item.button.link}
                  >
                    {item.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <About data={about} />
      <QA data={qa} />
      <Features data={features} />
      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
