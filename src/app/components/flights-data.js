import SearchSection from "./search-section";
import Layout from "./_layout";
import Footer from "./footer";
import { capitalizeEachWord } from "../helpers/common";
import PartnerLogo from "./partner-logo";


export default function FlightsData(props) {
  return (
    <>
      <Layout />
      <SearchSection />
      <PartnerLogo></PartnerLogo>
      <div className="container py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            {props?.data?.parent &&
              <li className={props?.data?.child1 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child1 ? <a href={`/${props.data.parent}`}>{capitalizeEachWord(props.data.parent.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child1 &&
              <li className={props?.data?.child2 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child2 ? <a href={`/${props.data.parent}/${props.data.child1}`}>{capitalizeEachWord(props.data.child1.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child2 &&
              <li className={props?.data?.child3 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child3 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}`}>{capitalizeEachWord(props.data.child2.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child3 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child4 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/`}>{capitalizeEachWord(props.data.child3.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child4 &&
              <li className={props?.data?.child5 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child5 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/`}>{capitalizeEachWord(props.data.child4.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child5 &&
              <li className={props?.data?.child6 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child6 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/`}>{capitalizeEachWord(props.data.child5.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child6 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child7 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/${props.data.child6}/`}>{capitalizeEachWord(props.data.child6.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child7 &&
              <li className={props?.data?.child4 ? "breadcrumb-item" : "breadcrumb-item active"}>
                {props?.data?.child8 ? <a href={`/${props.data.parent}/${props.data.child1}/${props.data.child2}/${props.data.child3}/${props.data.child4}/${props.data.child5}/${props.data.child6}/${props.data.child7}/`}>{capitalizeEachWord(props.data.child7.replace(/-/g, ' '))}</a> : capitalizeEachWord(props.data.bannerTitle)}
              </li>
            }
            {props?.data?.child8 &&
              <li className="breadcrumb-item active" aria-current="page">{capitalizeEachWord(props.data.bannerTitle)}</li>
            }
          </ol>
        </nav>
      </div>

      {!!props?.data?.bannerTitle &&
        <div className="text-center d-table m-auto">
          <h1 className=" color-orange fw-bold">{props.data.bannerTitle}</h1>
          <hr className="w-50 m-auto border-orange border-2 opacity-100" />
        </div>
      }

      <div className="container HolidayPackageContent mt-4 mb-5" dangerouslySetInnerHTML={{ __html: props?.data?.content }} />

      {(props?.data?.flightPageFaqs?.length > 0 && !!props?.data?.flightPageFaqs[0].question && !!props?.data?.flightPageFaqs[0].answer) &&
        <section className="py-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="subHeading">
                  <h2 className="mb-4 fw-normal">Frequently Asked  <strong className="color-orange">Questions</strong></h2>
                </div>
              </div>
              <div className="col-12">
                <div className="accordion fs-14" id="accordionExample">
                  {props.data.flightPageFaqs.map((faq, ix) => {
                    return <div key={ix} className="accordion-item">
                      <h2 className="accordion-header" id={"heading" + ix}>
                        <button className={ix == 0 ? "color-blue fw-bold accordion-button" : "color-blue fw-bold accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#FAQ" + ix} aria-expanded="true" aria-controls={"FAQ" + ix}>Q: {faq.question}</button>
                      </h2>
                      <div id={"FAQ" + ix} className={ix == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading" + ix} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <strong>Answer:</strong> {faq.answer}
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      {props?.data?.content && <Footer />}
    </>
  )
}