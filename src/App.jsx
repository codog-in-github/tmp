
import { Button, Table } from "antd";
import { useEffect, useState } from "react";

const getList = (page) => new Promise(resolve => {
  const list = Array(10).fill(0).map((_, i) => ({
    id: i + page * 10,
    name: `name${i + page * 10}`,
    address: `address${i + page * 10}`,
  }))
  setTimeout(resolve, 1000, list)
}) 
const App = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const fetch = () => {
    setLoading(true)
    getList(page)
      .then(setList)
      .finally(() => setLoading(false))
  }
  const nextPage = () => {
    setPage(page + 1)
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])
  
  return (
    <>
      <Table
        rowKey="id"
        dataSource={list}
        loading={loading}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '姓名', dataIndex: 'name' },
          { title: '地址', dataIndex: 'address' },
        ]}></Table>
      <Button type="primary" onClick={nextPage}>下一页</Button>
    </>
  );
};

export default App;
