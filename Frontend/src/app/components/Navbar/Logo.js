import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Logo = () => {
  return (
    <StaticQuery
      query={graphql`
        query MyQueryTwo {
          allStrapiConfig {
            nodes {
              logo {
                publicURL
              }
            }
          }
        }
      `}
      render={(data) => (
        <a href="/" className="logo d-flex align-items-center">
          <img
            src={
              data &&
              data.allStrapiConfig &&
              data.allStrapiConfig.nodes &&
              data.allStrapiConfig.nodes[0] &&
              data.allStrapiConfig.nodes[0]?.logo?.publicURL
            }
            alt=""
          />
          <div className="row">
            <div className="col-12  d-flex ">
              <span style={{ fontSize: "16px", minHeight: "20px" }}>
                Global Software
              </span>
            </div>

            <div className="col-12 d-flex" style={{ paddingLeft: "27px" }}>
              <br />
              <span style={{ fontSize: "16px" }}>Consulting</span>
            </div>
          </div>
        </a>
      )}
    />
  );
};

export default Logo;
