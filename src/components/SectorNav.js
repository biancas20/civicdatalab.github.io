import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SectorNavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 8px 40px;
  border: 3px solid black;
  text-decoration: none;
  color: black;
  background-color: white;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 45px;
  font-weight: 500;

  &:hover {
    color: white;
    background-color: black;
  }

  @media (min-width: 1024px) {
    font-size: 28px;
    padding: 6px 24px;
  }

`;

const SectorNavContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  align-items: center;
  padding-left: 16px;
  margin: 16px 0;

  ::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;

  .active-sector {
    color: white;
    background-color: black;
  }

  @media (min-width: 1600px) {
    justify-content: space-between;
  }
`;

const SectorNav = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sectors/" } }, sort: { fields: frontmatter___name }) {
        edges {
          node {
            id
            frontmatter {
              name
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const sectorsData = data.allMarkdownRemark.edges;

  return (
    <SectorNavContainer>
      <SectorNavItem activeClassName="active-sector" to="/sectors/">
        All
      </SectorNavItem>
      {sectorsData.map((sector) => (
        <SectorNavItem activeClassName="active-sector" key={sector.node.id} to={sector.node.fields.slug}>
          {sector.node.frontmatter.name}
        </SectorNavItem>
      ))}
    </SectorNavContainer>
  );
};

export default SectorNav;
