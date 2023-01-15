import { Layout } from 'antd';
import "../scss/Styles.scss";

function LayoutLogin(props) {
   const { children } = props;
   const { Header, Content, Footer } = Layout;
  return (
    <Layout>
       <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default LayoutLogin;