import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="light"
      className=" fixed-bottom text-center text-lg-left"
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Data from website:{" "}
        <a
          className="text-dark"
          href="https://developer.accuweather.com/"
          target="_blank"
        >
          developer.accuweather.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
