import { FloatButton, Button } from 'antd';
import { CustomerServiceOutlined, RedditOutlined, CommentOutlined } from '@ant-design/icons';
import HeadImage from '@/assets/img/Icon_3_Console.svg'
import '@/pages/index.less'

import NavBar from "@/components/NavBar";
import Content from "@/components/Content";
import Artcles from '@/components/Article';
import Footer from '@/components/Footer'

const HomePage: React.FC = () => {

  return (
    <div className="APP">
      <NavBar></NavBar>
      <Content></Content>
      {/* <Content></Content> */}
      <Artcles></Artcles>

      <Footer></Footer>
      <FloatButton
        shape="square"
        type="default"

        tooltip={<div>
          <p>技术栈介绍</p>
          <ul title='前端技术'>
            <li>基础：html、css、Java Script</li>
            <li>组件库：Antd-design、ProComponents</li>
            <li>脚手架：umijs/max</li>
            <li>语法扩展：TypeScript、Less</li>
            <li>代码规范：ESLint</li>
            <li>开发框架：React、Umi</li>
            <li>数据库：Mysql</li>
          </ul>

        </div>}
        icon={<RedditOutlined />}
        style={{ right: 24 }}>
        {/* style={{ right: 24, width: 150, height: 150, backgroundImage: `url(${HeadImage})`, backgroundPosition: 'center' }}> */}

      </FloatButton>

    </div>
  )
};

export default HomePage;
