import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';

import Grid from '../../components/Game/Grid';
import Keyboard from '../../components/Game/Keyboard';

const Home = () => {
  const [user] = useAtom(userAtom);

  console.log(user.token)
  console.log(user.username)
  console.log(user.id)
  console.log(user.isLoggedIn)

  return (
    <>
      {user.isLoggedIn ? (
      <> homepage du wordle de {user.username} </>
      ) : (
        <> homepage du wordle </>
      )}
      <Grid />
      <Keyboard />
    </>
  )
}

export default Home;
