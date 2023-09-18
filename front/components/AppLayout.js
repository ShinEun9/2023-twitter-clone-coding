import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/Link";
import { Menu, Input, Row, Col } from "antd";
import React from "react";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const items = [
    {
      label: (
        <Link href="/">
          <a>노드버드</a>
        </Link>
      ),
      key: "노드버드",
    },
    {
      label: (
        <Link href="/profile">
          <a>프로필</a>
        </Link>
      ),
      key: "프로필",
    },
    {
      label: <SearchInput enterButton style={{ verticalAlign: "middle" }} />,
      key: "검색",
    },
    {
      label: (
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      ),
      key: "회원가입",
    },
  ];
  return (
    <div>
      <Global />
      <Menu mode="horizontal" items={items} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://velog.io/@ses2201"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made By Eunsu
          </a>
          {/* 새창에서 띄울때(target="_blank") noopener noreferrer 적어줘야 보안위협사라짐 */}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
