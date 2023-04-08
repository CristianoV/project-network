import styles from './styles.module.scss';
import { BiMessageSquareEdit } from 'react-icons/bi';
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiFillStar,
} from 'react-icons/ai';
import Inputs from './inputs';
import { useSelector } from 'react-redux';

export default function Welcome() {
  const redux = useSelector((state: any) => state.user);

  const { info } = redux;

  return (
    <div className={styles.container}>
      <h1>Bem-vindo(a), {info.firstName}</h1>
      <hr />
      <div className={styles.inputs}>
        <Inputs text='recados' icon={<BiMessageSquareEdit />} number={0} />
        <Inputs text='fotos' icon={<AiOutlineCamera />} number={0} />
        <Inputs text='vídeos' icon={<AiOutlineVideoCamera />} number={0} />
        <Inputs text='fãs' icon={<AiFillStar />} number={0} />
      </div>
      <hr />
      <p>
        Sorte de hoje: <span>A sorte vem ao seu encontro</span>
      </p>
      <p>
        Você tem <span>3</span> tarefas para hoje
      </p>
      <hr />
    </div>
  );
}
