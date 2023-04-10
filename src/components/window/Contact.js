import React from "react";

import SocialMedia from "../main/SocialMedia";

// Contact is the Contact webpage of the site

export default function Contact() {
  // Contact details of the club team
  // Format: "Name - Designation", "91 XXXXX XXXXX", "Discord username (Optional)"
  // Note: Do not try to add, remove or rearrange the arrays of designations since
  // their allocations are fixed in the front-end of the page
  const phoneRecord = React.useState([
    ["Simar Tandon - President", "91 98715 99988", "critto#3569"], // President
    ["Aadi Jain - Vice President", "91 97735 00570"], // Vice President
    ["Adit Magotra - Secretary", "91 99588 77036", "The_AlphaLaser#0227"], // Secretary
    ["Anuja Mittal - Faculty In-charge", "91 99539 5074"], // Faculty In-charge
    ["Ruchi Mehra - Faculty In-charge", "91 98110 89272"], // Faculty In-charge
  ])[0];

  const phoneRecordElems = phoneRecord.map((e, i) => (
    <div key={i}>
      <p>{e[0]}</p>
      <p>
        Phone: <a href={`tel:${e[1]}`}>+{e[1]}</a>
      </p>
      {e[2] && <p>Discord: {e[2]}</p>}
    </div>
  ));
  return (
    <div className="contact">
      <h1>Contact</h1>
      <p>
        The best way to get in contact with us is by mailing us at any one of
        the given email IDs. If deemed appropriate, you may reach out to us by
        calling any one of the given phone numbers.
        <br />
        <br /> You can connect with us on Facebook and Instagram too.
      </p>
      <div className="contact--grid">
        <div className="contact--phone">
          <h2>Phone</h2>
          {phoneRecordElems}
        </div>
        <div className="contact--email">
          <h2>Email</h2>
          <a href="maitlto:projectbeta@sanskritischool.edu.in">
            projectbeta@sanskritischool.edu.in
          </a>
        </div>
        <div className="contact--social">
          <h2>Social</h2>
          <div className="contact--socialgrid">
            <SocialMedia />
            <a
              href="https://www.instagram.com/projectbeta.club/"
              target="_blank"
              rel="noreferrer"
            >
              @projectbeta.club
            </a>
            <a
              href="https://github.com/Project-Beta"
              target="_blank"
              rel="noreferrer"
            >
              @projectbeta.tech
            </a>
            <a
              href="https://www.facebook.com/ProjectBetaOfficial"
              target="_blank"
              rel="noreferrer"
            >
              @ProjectBetaOfficial
            </a>
          </div>
        </div>
        <div className="contact--address">
          <h2>Address</h2>
          <p>
            Sanskriti School
            <br />
            Dr. S. Radhakrishnan Marg,
            <br />
            Chanakyapuri,
            <br />
            New Delhi, Delhi 110021
          </p>
        </div>
      </div>
    </div>
  );
}
