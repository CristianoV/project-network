import styles from './styles.module.scss';
import logo from '../../../public/orkutLogo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Link href='/'>
            <Image src={logo} alt='logo' />
          </Link>
          <h2>
            Criar uma nova conta no <span>Orkut</span>
          </h2>
        </div>
        <form>
          <h3>
            Informações necessárias para o cadastro de uma nova conta no site
          </h3>
          <label htmlFor='firstName'>
            Nome:
            <input type='text' placeholder='Nome' id='firstName' />
          </label>
          <label htmlFor='lastName'>
            Sobrenome:
            <input type='text' placeholder='Sobrenome' id='lastName' />
          </label>
          <label htmlFor='email'>
            O seu endereço de email atual:
            <input type='text' placeholder='Email' id='email' />
          </label>
          <label htmlFor='password'>
            Escolha uma senha:
            <input type='password' placeholder='Senha' id='password' />
          </label>
          <label htmlFor='password'>
            Digite a senha novamente:
            <input type='password' placeholder='Senha' id='password' />
          </label>
          <hr />
          <h3>Termos de uso e política de privacidade do site Orkut</h3>
          <h2>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
            quibusdam optio tempore, dignissimos provident quae et magnam.
            Dolore explicabo ducimus ut reiciendis, aliquid, error totam, maxime
            excepturi natus deserunt nesciunt? Debitis unde perferendis nostrum
            neque voluptas natus! Fugit deleniti laborum fugiat sint recusandae,
            accusantium unde odit amet, libero soluta consequatur quasi, autem
            explicabo. Error rerum sed et nam, voluptatem vitae. In quasi vitae
            illum facilis veniam ex deleniti repellat voluptatum? Enim,
            voluptate error? Quis quas inventore minima, odio ab sed, nisi
            laborum ut eum incidunt, fugit voluptates expedita. Accusantium,
            asperiores? Alias nulla molestias est minima odio maiores eaque
            excepturi reiciendis repellendus esse. Repellendus saepe fuga itaque
            ut. Consequatur sunt doloribus sequi nisi cum adipisci accusamus
            voluptatem exercitationem qui in. Animi? Facere eius aut officiis
            accusantium reiciendis totam animi corporis dolorum omnis porro,
            expedita, praesentium doloribus quidem vel nihil sequi, explicabo
            quos beatae voluptatum. Repellat, molestiae iusto accusamus aliquam
            voluptate ipsum.
          </h2>
          <hr />
          <label htmlFor='policy'>
            <input type='checkbox' id='policy' />
            <p>Eu aceito os termos de uso e a política de privacidade</p>
          </label>

          <label htmlFor='privacy'>
            <input type='checkbox' id='privacy' />
            <p>
              Eu li e concordo com os termos de uso e a política de privacidade
            </p>
          </label>
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  );
}
