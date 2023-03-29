import type { CascaderProps, } from 'antd';
import request from "umi-request";
import '../user/pub.less'
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Space,
  Tag,
  Card
} from 'antd';
import React, { useEffect, useState } from 'react';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

const { Option } = Select;

const { CheckableTag } = Tag;

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 24 },
  // },
};

const tailFormItemLayout = {
  // wrapperCol: {
  //   xs: {
  //     span: 24,
  //     offset: 0,
  //   },
  //   sm: {
  //     span: 16,
  //     offset: 0,
  //   },
  // },
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  let [cateList, setCateList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const loading = () => {
    messageApi.open({
      type: 'loading',
      content: '正在添加文章，请稍后..',
    })
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '添加成功',
    });
  };

  // editor 实例
  const [editor, setEditor] = useState(null)
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  async function loadCate() {
    try {
      const res = await request.get('/api/category')
      setCateList(res)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    loading()
    const data = {
      title: values.title,
      content: html,
      categoryId: values.categoryId,
      imageUrl: values.imageUrl,
      tags: selectedTags.join(',')
    }

    console.log(data)
    const res = await request.post('/api/posts', {
      data
    })
    console.log(res)
    success()
    // onReset()

  };
  const onReset = () => {
    form.resetFields();
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }

  //异步请求
  useEffect(() => {
    loadCate()
  }, [])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div>
      {contextHolder}
      <div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ padding: 0, margin: 0, maxWidth: 1500 }}
          scrollToFirstError
        >

          <Form.Item
            name="title" label="标题" rules={[
              { required: true, message: '文章标题', },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: false }]}
          >
            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px' }}>
              <Toolbar editor={editor} mode="default" style={{ borderBottom: '1px solid #ccc' }}></Toolbar>
              <Editor editor={editor} onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '400px' }}></Editor>
            </div>
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="分类"
            rules={[{ required: true, message: '文章分类' }]}
          >
            <Select placeholder="select your category">
              {cateList.length !== 0 && cateList.map((item, index) => (
                <Option value={item.id} key={item.id}>{item.name} </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="图片链接"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: false, message: '标签' }]}
          >
            <Space size={[0, 8]} wrap>
              {cateList.length === 0 && <Card style={{ width: 400, height: 50, backgroundColor: '#f5f5f5' }} loading={true}></Card>}
              {cateList.length !== 0 && cateList.map((item, index) => (
                <CheckableTag
                  key={item.id}
                  checked={selectedTags.includes(item.name)}
                  onChange={(checked: boolean) => handleChange(item.name, checked)}
                >
                  {item.name}
                </CheckableTag>
              ))}
            </Space>
          </Form.Item>


          <Form.Item {...tailFormItemLayout} style={{ marginLeft: '30px' }}>
            <Button type="primary" htmlType="submit" size='middle' style={{ marginRight: '15px' }}>
              添加
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ marginRight: '15px' }}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;