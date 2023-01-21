import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {getSession} from  'next-auth/react'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
const Home = ({session,posts}) => {
  
  if(!session) return <Login/>
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header/>
      <main className='flex '>
        <Sidebar/>
        <Feed posts={posts} />
        <Widgets/>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session=await getSession(context);
  let posts=[];
  const colRef = collection(db,'posts')
  // const posts = await query(colRef,orderBy('timestamp','desc')).get()
  const q = await query(colRef,orderBy('timestamp','desc'))
  onSnapshot(q,(snapshot)=>{
snapshot.docs.map((doc)=>{
  posts.push({...doc.data(),id:doc.id,timestamp:null})
})
})
  
  // const docs = posts.docs.map(post=>({
  //   id:post.id,...post.data(),timestamp:null
  // }))
  return {
    props:{
      session,
      posts:posts
    }
  }
}