// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  MoreVertical,
  Archive,
  Trash,
  Edit,
} from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  ListGroup,
  ListGroupItem,
  Col,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      ref={ref}
      {...rest}
    />
    <label className="custom-control-label" onClick={onClick} />
  </div>
));

const columns = [
  {
    name: "Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
  {
    name: "Role",
    sortable: true,
    selector: (row) => row.role,
  },
  {
    name: "currentPlan",
    selector: (row) => row.currentPlan,
    sortable: true,
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pr-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={15} />
                <span className="align-middle ml-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Archive size={15} />
                <span className="align-middle ml-50">Archive</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Trash size={15} />
                <span className="align-middle ml-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    },
  },
];

const data = {
  users: [
    {
      id: 1,
      billing: "Manual - Credit Card",
      fullName: "Galen Slixby",
      company: "Yotz PVT LTD",
      role: "editor",
      username: "gslixby0",
      country: "El Salvador",
      contact: "(479) 232-9151",
      email: "gslixby0@abc.net.au",
      currentPlan: "enterprise",
      status: "inactive",
      avatar: "",
      avatarColor: "light-primary",
    },
    {
      id: 2,
      billing: "Manual - Paypal",
      fullName: "Halsey Redmore",
      company: "Skinder PVT LTD",
      role: "author",
      username: "hredmore1",
      country: "Albania",
      contact: "(472) 607-9137",
      email: "hredmore1@imgur.com",
      currentPlan: "team",
      status: "pending",
      avatar: require("@src/assets/images/avatars/10.png").default,
    },
    {
      id: 3,
      billing: "Auto Debit",
      fullName: "Marjory Sicely",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "msicely2",
      country: "Russia",
      contact: "(321) 264-4599",
      email: "msicely2@who.int",
      currentPlan: "enterprise",
      status: "active",
      avatar: require("@src/assets/images/avatars/1.png").default,
    },
    {
      id: 4,
      billing: "Manual - Credit Card",
      fullName: "Cyrill Risby",
      company: "Oozz PVT LTD",
      role: "maintainer",
      username: "crisby3",
      country: "China",
      contact: "(923) 690-6806",
      email: "crisby3@wordpress.com",
      currentPlan: "team",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
    {
      id: 5,
      billing: "Auto Debit",
      fullName: "Maggy Hurran",
      company: "Aimbo PVT LTD",
      role: "subscriber",
      username: "mhurran4",
      country: "Pakistan",
      contact: "(669) 914-1078",
      email: "mhurran4@yahoo.co.jp",
      currentPlan: "enterprise",
      status: "pending",
      avatar: require("@src/assets/images/avatars/10.png").default,
    },
    {
      id: 6,
      billing: "Auto Debit",
      fullName: "Silvain Halstead",
      company: "Jaxbean PVT LTD",
      role: "author",
      username: "shalstead5",
      country: "China",
      contact: "(958) 973-3093",
      email: "shalstead5@shinystat.com",
      currentPlan: "company",
      status: "active",
      avatar: "",
      avatarColor: "light-success",
    },
    {
      id: 7,
      billing: "Manual - Paypal",
      fullName: "Breena Gallemore",
      company: "Jazzy PVT LTD",
      role: "subscriber",
      username: "bgallemore6",
      country: "Canada",
      contact: "(825) 977-8152",
      email: "bgallemore6@boston.com",
      currentPlan: "company",
      status: "pending",
      avatar: "",
      avatarColor: "light-danger",
    },
    {
      id: 8,
      billing: "Manual - Cash",
      fullName: "Kathryne Liger",
      company: "Pixoboo PVT LTD",
      role: "author",
      username: "kliger7",
      country: "France",
      contact: "(187) 440-0934",
      email: "kliger7@vinaora.com",
      currentPlan: "enterprise",
      status: "pending",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
    {
      id: 9,
      billing: "Auto Debit",
      fullName: "Franz Scotfurth",
      company: "Tekfly PVT LTD",
      role: "subscriber",
      username: "fscotfurth8",
      country: "China",
      contact: "(978) 146-5443",
      email: "fscotfurth8@dailymotion.com",
      currentPlan: "team",
      status: "pending",
      avatar: require("@src/assets/images/avatars/2.png").default,
    },
    {
      id: 10,
      billing: "Auto Debit",
      fullName: "Jillene Bellany",
      company: "Gigashots PVT LTD",
      role: "maintainer",
      username: "jbellany9",
      country: "Jamaica",
      contact: "(589) 284-6732",
      email: "jbellany9@kickstarter.com",
      currentPlan: "company",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
    {
      id: 11,
      billing: "Manual - Paypal",
      fullName: "Jonah Wharlton",
      company: "Eare PVT LTD",
      role: "subscriber",
      username: "jwharltona",
      country: "United States",
      contact: "(176) 532-6824",
      email: "jwharltona@oakley.com",
      currentPlan: "team",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/4.png").default,
    },
    {
      id: 12,
      billing: "Manual - Credit Card",
      fullName: "Seth Hallam",
      company: "Yakitri PVT LTD",
      role: "subscriber",
      username: "shallamb",
      country: "Peru",
      contact: "(234) 464-0600",
      email: "shallamb@hugedomains.com",
      currentPlan: "team",
      status: "pending",
      avatar: require("@src/assets/images/avatars/5.png").default,
    },
    {
      id: 13,
      billing: "Auto Debit",
      fullName: "Yoko Pottie",
      company: "Leenti PVT LTD",
      role: "subscriber",
      username: "ypottiec",
      country: "Philippines",
      contact: "(907) 284-5083",
      email: "ypottiec@privacy.gov.au",
      currentPlan: "basic",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/7.png").default,
    },
    {
      id: 14,
      billing: "Auto Debit",
      fullName: "Maximilianus Krause",
      company: "Digitube PVT LTD",
      role: "author",
      username: "mkraused",
      country: "Democratic Republic of the Congo",
      contact: "(167) 135-7392",
      email: "mkraused@stanford.edu",
      currentPlan: "team",
      status: "active",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
    {
      id: 15,
      billing: "Auto Debit",
      fullName: "Zsazsa McCleverty",
      company: "Kaymbo PVT LTD",
      role: "maintainer",
      username: "zmcclevertye",
      country: "France",
      contact: "(317) 409-6565",
      email: "zmcclevertye@soundcloud.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: require("@src/assets/images/avatars/2.png").default,
    },
    {
      id: 16,
      billing: "Auto Debit",
      fullName: "Bentlee Emblin",
      company: "Yambee PVT LTD",
      role: "author",
      username: "bemblinf",
      country: "Spain",
      contact: "(590) 606-1056",
      email: "bemblinf@wired.com",
      currentPlan: "company",
      status: "active",
      avatar: require("@src/assets/images/avatars/6.png").default,
    },
    {
      id: 17,
      billing: "Manual - Paypal",
      fullName: "Brockie Myles",
      company: "Wikivu PVT LTD",
      role: "maintainer",
      username: "bmylesg",
      country: "Poland",
      contact: "(553) 225-9905",
      email: "bmylesg@amazon.com",
      currentPlan: "basic",
      status: "active",
      avatar: "",
      avatarColor: "light-warning",
    },
    {
      id: 18,
      billing: "Manual - Cash",
      fullName: "Bertha Biner",
      company: "Twinte PVT LTD",
      role: "editor",
      username: "bbinerh",
      country: "Yemen",
      contact: "(901) 916-9287",
      email: "bbinerh@mozilla.com",
      currentPlan: "team",
      status: "active",
      avatar: require("@src/assets/images/avatars/7.png").default,
    },
    {
      id: 19,
      billing: "Manual - Cash",
      fullName: "Travus Bruntjen",
      company: "Cogidoo PVT LTD",
      role: "admin",
      username: "tbruntjeni",
      country: "France",
      contact: "(524) 586-6057",
      email: "tbruntjeni@sitemeter.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: "",
      avatarColor: "light-info",
    },
    {
      id: 20,
      billing: "Auto Debit",
      fullName: "Wesley Burland",
      company: "Bubblemix PVT LTD",
      role: "editor",
      username: "wburlandj",
      country: "Honduras",
      contact: "(569) 683-1292",
      email: "wburlandj@uiuc.edu",
      currentPlan: "team",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/6.png").default,
    },
    {
      id: 21,
      billing: "Auto Debit",
      fullName: "Selina Kyle",
      company: "Wayne Enterprises",
      role: "admin",
      username: "catwomen1940",
      country: "USA",
      contact: "(829) 537-0057",
      email: "irena.dubrovna@wayne.com",
      currentPlan: "team",
      status: "active",
      avatar: require("@src/assets/images/avatars/1.png").default,
    },
    {
      id: 22,
      billing: "Auto Debit",
      fullName: "Jameson Lyster",
      company: "Quaxo PVT LTD",
      role: "editor",
      username: "jlysterl",
      country: "Ukraine",
      contact: "(593) 624-0222",
      email: "jlysterl@guardian.co.uk",
      currentPlan: "company",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/8.png").default,
    },
    {
      id: 23,
      billing: "Manual - Paypal",
      fullName: "Kare Skitterel",
      company: "Ainyx PVT LTD",
      role: "maintainer",
      username: "kskitterelm",
      country: "Poland",
      contact: "(254) 845-4107",
      email: "kskitterelm@washingtonpost.com",
      currentPlan: "basic",
      status: "pending",
      avatar: require("@src/assets/images/avatars/3.png").default,
    },
    {
      id: 24,
      billing: "Manual - Paypal",
      fullName: "Cleavland Hatherleigh",
      company: "Flipopia PVT LTD",
      role: "admin",
      username: "chatherleighn",
      country: "Brazil",
      contact: "(700) 783-7498",
      email: "chatherleighn@washington.edu",
      currentPlan: "team",
      status: "pending",
      avatar: require("@src/assets/images/avatars/2.png").default,
    },
    {
      id: 25,
      billing: "Manual - Credit Card",
      fullName: "Adeline Micco",
      company: "Topicware PVT LTD",
      role: "admin",
      username: "amiccoo",
      country: "France",
      contact: "(227) 598-1841",
      email: "amiccoo@whitehouse.gov",
      currentPlan: "enterprise",
      status: "pending",
      avatar: "",
      avatarColor: "light-primary",
    },
    {
      id: 26,
      billing: "Manual - Cash",
      fullName: "Hugh Hasson",
      company: "Skinix PVT LTD",
      role: "admin",
      username: "hhassonp",
      country: "China",
      contact: "(582) 516-1324",
      email: "hhassonp@bizjournals.com",
      currentPlan: "basic",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/4.png").default,
    },
    {
      id: 27,
      billing: "Manual - Cash",
      fullName: "Germain Jacombs",
      company: "Youopia PVT LTD",
      role: "editor",
      username: "gjacombsq",
      country: "Zambia",
      contact: "(137) 467-5393",
      email: "gjacombsq@jigsy.com",
      currentPlan: "enterprise",
      status: "active",
      avatar: require("@src/assets/images/avatars/10.png").default,
    },
    {
      id: 28,
      billing: "Manual - Credit Card",
      fullName: "Bree Kilday",
      company: "Jetpulse PVT LTD",
      role: "maintainer",
      username: "bkildayr",
      country: "Portugal",
      contact: "(412) 476-0854",
      email: "bkildayr@mashable.com",
      currentPlan: "team",
      status: "active",
      avatar: "",
      avatarColor: "light-success",
    },
    {
      id: 29,
      billing: "Auto Debit",
      fullName: "Candice Pinyon",
      company: "Kare PVT LTD",
      role: "maintainer",
      username: "cpinyons",
      country: "Sweden",
      contact: "(170) 683-1520",
      email: "cpinyons@behance.net",
      currentPlan: "team",
      status: "active",
      avatar: require("@src/assets/images/avatars/7.png").default,
    },
    {
      id: 30,
      billing: "Manual - Credit Card",
      fullName: "Isabel Mallindine",
      company: "Voomm PVT LTD",
      role: "subscriber",
      username: "imallindinet",
      country: "Slovenia",
      contact: "(332) 803-1983",
      email: "imallindinet@shinystat.com",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      avatarColor: "light-warning",
    },
    {
      id: 31,
      billing: "Manual - Cash",
      fullName: "Gwendolyn Meineken",
      company: "Oyondu PVT LTD",
      role: "admin",
      username: "gmeinekenu",
      country: "Moldova",
      contact: "(551) 379-7460",
      email: "gmeinekenu@hc360.com",
      currentPlan: "basic",
      status: "pending",
      avatar: require("@src/assets/images/avatars/1.png").default,
    },
    {
      id: 32,
      billing: "Manual - Paypal",
      fullName: "Rafaellle Snowball",
      company: "Fivespan PVT LTD",
      role: "editor",
      username: "rsnowballv",
      country: "Philippines",
      contact: "(974) 829-0911",
      email: "rsnowballv@indiegogo.com",
      currentPlan: "basic",
      status: "pending",
      avatar: require("@src/assets/images/avatars/5.png").default,
    },
    {
      id: 33,
      billing: "Auto Debit",
      fullName: "Rochette Emer",
      company: "Thoughtworks PVT LTD",
      role: "admin",
      username: "remerw",
      country: "North Korea",
      contact: "(841) 889-3339",
      email: "remerw@blogtalkradio.com",
      currentPlan: "basic",
      status: "active",
      avatar: require("@src/assets/images/avatars/8.png").default,
    },
    {
      id: 34,
      billing: "Manual - Cash",
      fullName: "Ophelie Fibbens",
      company: "Jaxbean PVT LTD",
      role: "subscriber",
      username: "ofibbensx",
      country: "Indonesia",
      contact: "(764) 885-7351",
      email: "ofibbensx@booking.com",
      currentPlan: "company",
      status: "active",
      avatar: require("@src/assets/images/avatars/4.png").default,
    },
    {
      id: 35,
      billing: "Manual - Paypal",
      fullName: "Stephen MacGilfoyle",
      company: "Browseblab PVT LTD",
      role: "maintainer",
      username: "smacgilfoyley",
      country: "Japan",
      contact: "(350) 589-8520",
      email: "smacgilfoyley@bigcartel.com",
      currentPlan: "company",
      status: "pending",
      avatar: "",
      avatarColor: "light-danger",
    },
    {
      id: 36,
      billing: "Manual - Paypal",
      fullName: "Bradan Rosebotham",
      company: "Agivu PVT LTD",
      role: "subscriber",
      username: "brosebothamz",
      country: "Belarus",
      contact: "(882) 933-2180",
      email: "brosebothamz@tripadvisor.com",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      avatarColor: "light-info",
    },
    {
      id: 37,
      billing: "Manual - Cash",
      fullName: "Skip Hebblethwaite",
      company: "Katz PVT LTD",
      role: "admin",
      username: "shebblethwaite10",
      country: "Canada",
      contact: "(610) 343-1024",
      email: "shebblethwaite10@arizona.edu",
      currentPlan: "company",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
    {
      id: 38,
      billing: "Manual - Credit Card",
      fullName: "Moritz Piccard",
      company: "Twitternation PVT LTD",
      role: "maintainer",
      username: "mpiccard11",
      country: "Croatia",
      contact: "(365) 277-2986",
      email: "mpiccard11@vimeo.com",
      currentPlan: "enterprise",
      status: "inactive",
      avatar: require("@src/assets/images/avatars/1.png").default,
    },
    {
      id: 39,
      billing: "Manual - Cash",
      fullName: "Tyne Widmore",
      company: "Yombu PVT LTD",
      role: "subscriber",
      username: "twidmore12",
      country: "Finland",
      contact: "(531) 731-0928",
      email: "twidmore12@bravesites.com",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      avatarColor: "light-primary",
    },
    {
      id: 40,
      billing: "Manual - Cash",
      fullName: "Florenza Desporte",
      company: "Kamba PVT LTD",
      role: "author",
      username: "fdesporte13",
      country: "Ukraine",
      contact: "(312) 104-2638",
      email: "fdesporte13@omniture.com",
      currentPlan: "company",
      status: "active",
      avatar: require("@src/assets/images/avatars/6.png").default,
    },
    {
      id: 41,
      billing: "Manual - Credit Card",
      fullName: "Edwina Baldetti",
      company: "Dazzlesphere PVT LTD",
      role: "maintainer",
      username: "ebaldetti14",
      country: "Haiti",
      contact: "(315) 329-3578",
      email: "ebaldetti14@theguardian.com",
      currentPlan: "team",
      status: "pending",
      avatar: "",
      avatarColor: "light-success",
    },
    {
      id: 42,
      billing: "Manual - Cash",
      fullName: "Benedetto Rossiter",
      company: "Mybuzz PVT LTD",
      role: "editor",
      username: "brossiter15",
      country: "Indonesia",
      contact: "(323) 175-6741",
      email: "brossiter15@craigslist.org",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      avatarColor: "light-danger",
    },
    {
      id: 43,
      billing: "Manual - Credit Card",
      fullName: "Micaela McNirlan",
      company: "Tambee PVT LTD",
      role: "admin",
      username: "mmcnirlan16",
      country: "Indonesia",
      contact: "(242) 952-0916",
      email: "mmcnirlan16@hc360.com",
      currentPlan: "basic",
      status: "inactive",
      avatar: "",
      avatarColor: "light-warning",
    },
    {
      id: 44,
      billing: "Manual - Paypal",
      fullName: "Vladamir Koschek",
      company: "Centimia PVT LTD",
      role: "author",
      username: "vkoschek17",
      country: "Guatemala",
      contact: "(531) 758-8335",
      email: "vkoschek17@abc.net.au",
      currentPlan: "team",
      status: "active",
      avatar: "",
      avatarColor: "light-info",
    },
    {
      id: 45,
      billing: "Manual - Paypal",
      fullName: "Corrie Perot",
      company: "Flipopia PVT LTD",
      role: "subscriber",
      username: "cperot18",
      country: "China",
      contact: "(659) 385-6808",
      email: "cperot18@goo.ne.jp",
      currentPlan: "team",
      status: "pending",
      avatar: require("@src/assets/images/avatars/3.png").default,
    },
    {
      id: 46,
      billing: "Auto Debit",
      fullName: "Saunder Offner",
      company: "Skalith PVT LTD",
      role: "maintainer",
      username: "soffner19",
      country: "Poland",
      contact: "(200) 586-2264",
      email: "soffner19@mac.com",
      currentPlan: "enterprise",
      status: "pending",
      avatar: "",
      avatarColor: "light-primary",
    },
    {
      id: 47,
      billing: "Manual - Paypal",
      fullName: "Karena Courtliff",
      company: "Feedfire PVT LTD",
      role: "admin",
      username: "kcourtliff1a",
      country: "China",
      contact: "(478) 199-0020",
      email: "kcourtliff1a@bbc.co.uk",
      currentPlan: "basic",
      status: "active",
      avatar: require("@src/assets/images/avatars/1.png").default,
    },
    {
      id: 48,
      billing: "Manual - Paypal",
      fullName: "Onfre Wind",
      company: "Thoughtmix PVT LTD",
      role: "admin",
      username: "owind1b",
      country: "Ukraine",
      contact: "(344) 262-7270",
      email: "owind1b@yandex.ru",
      currentPlan: "basic",
      status: "pending",
      avatar: "",
      avatarColor: "light-success",
    },
    {
      id: 49,
      billing: "Manual - Cash",
      fullName: "Paulie Durber",
      company: "Babbleblab PVT LTD",
      role: "subscriber",
      username: "pdurber1c",
      country: "Sweden",
      contact: "(694) 676-1275",
      email: "pdurber1c@gov.uk",
      currentPlan: "team",
      status: "inactive",
      avatar: "",
      avatarColor: "light-danger",
    },
    {
      id: 50,
      billing: "Auto Debit",
      fullName: "Beverlie Krabbe",
      company: "Kaymbo PVT LTD",
      role: "editor",
      username: "bkrabbe1d",
      country: "China",
      contact: "(397) 294-5153",
      email: "bkrabbe1d@home.pl",
      currentPlan: "company",
      status: "active",
      avatar: require("@src/assets/images/avatars/9.png").default,
    },
  ],
};

const UsersTable = () => {
  // ** States
  const [plan, setPlan] = useState("");
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  // ** Get data on mount

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchTerm(value);

    if (value.length) {
      updatedData = data.users?.filter((item) => {
        const startsWith =
          item.fullName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.role.toLowerCase().startsWith(value.toLowerCase()) ||
          item.currentPlan.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.fullName.toLowerCase().includes(value.toLowerCase()) ||
          item.role.toLowerCase().includes(value.toLowerCase()) ||
          item.currentPlan.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchTerm(value);
    }
  };
  const ExpandableTable = ({ data }) => {
    return <></>;
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchTerm.length ? filteredData.length / 7 : data.users.length / 7 || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        <CardTitle tag="h4">Event List</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline>
              <Share size={15} />
              <span className="align-middle ml-50">Export</span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className="w-100">
                <Printer size={15} />
                <span className="align-middle ml-50">Print</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <FileText size={15} />
                <span className="align-middle ml-50">CSV</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Grid size={15} />
                <span className="align-middle ml-50">Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File size={15} />
                <span className="align-middle ml-50">PDF</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Copy size={15} />
                <span className="align-middle ml-50">Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button className="ml-2" color="primary">
            <Plus size={15} />
            <span className="align-middle ml-50">Add Record</span>
          </Button>
        </div>
      </CardHeader>
      <Row className="justify-content-end mx-0">
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="6"
          sm="12"
        >
          <Label className="mr-1" for="search-input">
            Search
          </Label>
          <Input
            className="dataTable-filter mb-50"
            type="text"
            bsSize="sm"
            id="search-input"
            value={searchTerm}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <DataTable
        noHeader
        pagination
        expandableRows
        expandOnRowClicked
        columns={columns}
        paginationPerPage={7}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={searchTerm.length ? filteredData : data.users}
        selectableRowsComponent={BootstrapCheckbox}
        expandableRowsComponent={<ExpandableTable />}
      />
    </Card>
  );
};

export default UsersTable;
