export async function generateStaticParams() {
  // Match keys from your serviceData object
  const slugs = [
    'visa-recommendation',
    'investment-matchmaking',
    'business-recommendation',
    'economic-growth',
  ];

  return slugs.map(slug => ({ slug }));
}


import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import Image from "next/image";


const serviceData = {
 "visa-recommendation": {
  title: "Visa Recommendation",
  image: "/services1.jpeg",
  description: (
      <>
        <p>
          {"The Bundelkhand Chamber issues Visa Recommendation Letters to representatives of organizations wishing to travel overseas for the promotion of business and other related activities. Certain embassies/countries request for certification of visa application by the recognized chambers. The Bundelkhand Chamber visa documentation helps in processing the visas of member and non-member firms."}
        </p>
        <p className="mt-4">
          {"The firms desirous of obtaining recommendation letters for the issue of visas are requested to furnish the following documents to the Bundelkhand Chamber at the time of applying:"}
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            {"Request letter addressed to President of the Bundelkhand Chamber, on the original letterhead of the firm (application format to be obtained from the Recommendation Department of Bundelkhand Chamber)."}
          </li>
          <li>{"Photocopy of the passport of the person applying for the visa."}</li>
          <li>{"Photocopy of the invitation letter received from the country to be visited."}</li>
          <li>{"The request letter should be signed by the person applying for the visa."}</li>
          <li>{"All photocopies must be certified with signature and stamp of the person signing the application."}</li>
        </ul>
      </>
    ),
  },

  "investment-matchmaking": {
    title: "Investment Matchmaking",
    image: "/services2.jpeg",
    description: (
      <>
        <p>
          {"The Bundelkhand Chamber provides customized investment facilitation services to the corporate sector. These include, among other things, providing specific product information, identification of joint venture partners, facilitating procedural matters with the respective authorities, matchmaking, etc."}
        </p>
        <p className="mt-4">
          {"Bundelkhand Chamber intends to emerge as one-stop centre providing investment-related information and services. Apart from providing information related to business matchmaking to interested companies, the Chamber thus, has been instrumental in creating real platforms for establishing business-to-business linkages, through various Buyer-Seller Meets, One-on-One Investor meetings, etc. Through its linkages and partnerships with Trade & Industry Associations from rest of Asia, and the World, the Bundelkhand Chamber, can truly act as an effective mediator between OTHER Corporates from India and abroad."}
          <br />
          {"This Department is headed by DHIRAJ KHULLAR"}
        </p>
      </>
    ),
  },
  "business-recommendation": {
    title: "Business Information Services",
    image: "/services3.jpeg",
    description: (
      <>
        <p>
          {"The Bundelkhand Chamber issues visa recommendation letters to representatives of organizations wishing to travel overseas for the promotion of business and other related activities. Certain embassies/countries request for certification of visa application by the recognized Chambers. The Bundelkhand Chamber Visa Documentation helps in processing the visas of member and non-member firms."}
        </p>
        <p className="mt-4">
          {"The firms desirous of obtaining recommendation letters for the issue of visas are requested to furnish the following documents to the Bundelkhand Chamber at the time of applying:"}
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            {"Request letter addressed to President of the Bundelkhand Chamber, on the original letterhead of the firm (application format to be obtained from the Recommendation Department of Bundelkhand Chamber)"}
          </li>
          <li>{"Photocopy of the passport of the person applying for the visa."}</li>
          <li>{"Photocopy of the invitation letter received from the country to be visited."}</li>
          <li>{"The request letter should be signed by person applying for the visa."}</li>
          <li>{"All photocopies must be certified with signature and stamp of the person"}</li>
        </ul>
        <p>{"Signing The Application"}</p>
      </>
    ),
  },
  "economic-growth": {
    title: "Economic Growth",
    image: "/services4.jpeg",
    description: (
      <>
        <p>
          {"The Bundelkhand Chamber issues Visa Recommendation Letters to representatives of organizations wishing to travel overseas for the promotion of business and other related activities. Certain embassies/countries request for certification of visa application by the recognized chambers. The Bundelkhand Chamber visa documentation helps in processing the visas of member and non-member firms."}
        </p>
        <p className="mt-4">
          {"The firms desirous of obtaining recommendation letters for the issue of visas are requested to furnish the following documents to the Bundelkhand Chamber at the time of applying:"}
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            {"Request letter addressed to President of the Bundelkhand Chamber, on the original letterhead of the firm (application format to be obtained from the Recommendation Department of Bundelkhand Chamber)."}
          </li>
          <li>{"Photocopy of the passport of the person applying for the visa."}</li>
          <li>{"Photocopy of the invitation letter received from the country to be visited."}</li>
          <li>{"The request letter should be signed by the person applying for the visa."}</li>
          <li>{"All photocopies must be certified with signature and stamp of the person signing the application."}</li>
        </ul>
      </>
    ),
  },
};


export default function ServiceDetail({ params }) {
  const service = serviceData[params.slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">Service Not Found</h1>
      </div>
    );
  }

  return (
    <>
    <div>
      <Nav/>
    </div>  
    <div className="min-h-fit px-4 md:px-20 py-10 mt-30 mb-30 md:mt-0 md:mb-0 bg-[#fefbf6]">
      <div className="bg-white max-w-6xl mx-auto rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full md:w-1/3">
        <div className="md:hidden block mb-10 bg-orange-500 text-white text-xl md:text-2xl font-bold px-6 py-2 rounded-md w-max">
            {service.title}
          </div>
          <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="hidden md:block bg-orange-500 text-white text-xl md:text-2xl font-bold px-6 py-2 rounded-md w-max">
            {service.title}
          </div>
          <div className="mt-6 text-sm md:text-base text-gray-700 leading-relaxed">
            {service.description}
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
