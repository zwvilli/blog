import React, { useEffect, useState } from 'react';
import { history } from "umi";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>()

  async function refresh() {

    try {
      const res = await fetch('/api/posts')
      if (res.status === 200) {
        console.log(res)

        setPosts(await res.json())
      }
      else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error)
    }

  }
  // useEffect(() => {
  //   refresh()
  // }, [])

  return (
    <div>
      首页
    </div>
  )
};

export default HomePage;
