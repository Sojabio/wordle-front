import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';

const Home = () => {
  const [user] = useAtom(userAtom);

  console.log(user.token)
  console.log(user.username)
  console.log(user.id)
  console.log(user.isLoggedIn)

  return (
    <>
    {user.isLoggedIn ? (
    <> homepage du wordle de {user.username}
    </>
    ) : (
      <>
      homepage du wordle
      </>
    )
  }
    </>
  )
}

export default Home;
