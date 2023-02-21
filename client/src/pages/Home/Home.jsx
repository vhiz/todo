import './home.scss'
import Topbar from '../../components/topbar/Topbar'
import Todo from '../../components/todo/Todo'
export default function Home() {

  return (
    <>
    <Topbar/>
    <div className="home">
        <Todo/>
    </div>
    </>
  )
}
