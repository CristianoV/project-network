import logo from '../../../public/orkutLogo.png';
import styles from './styles.module.scss';
import Image from 'next/image';

export default function Login() {
  return (
    <div>
      <div className={styles.header}>
        <span>Aviso:</span>o site não tem vínculo com o Google e é apenas um
        clone para fins de estudo.
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <Image src={logo} alt='logo' width={500} height={500} />
          <div>
            <p>
              <span>Conecte-se</span> aos seus amigos e familiares usando
              recados e mensagens instantâneas
            </p>
            <p>
              <span>Conheça</span> novas pessoas através de amigos de seus
              amigos e comunidades
            </p>
            <p>
              <span>Compartilhe</span> seus vídeos, fotos e paixões em um só
              lugar
            </p>
          </div>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.loginBox}>
            <p>
              Acesse o <strong>Orkut.br</strong> com a sua conta
            </p>
            <form>
              <label htmlFor=''>
                E-mail:
                <input type='text' />
              </label>
              <label htmlFor=''>
                Senha:
                <input type='text' />
              </label>
              <label htmlFor='save' id={styles.check}>
                <input type='checkbox' name='' id='save' />
                Salvar as minhas informações neste computador
              </label>
              <p>Não use em computadores públicos [?]</p>
              <button type='submit'>Entrar</button>
            </form>
            <p>
              <a href='#'>Não consegue acessar a sua conta?</a>
            </p>
          </div>
          <div className={styles.registerBox}>
            <p>Ainda não é membro?</p>
            <a href='#'>Conecte-se agora</a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        @ 2021 Orkut.br - Sobre o Orkut.br - Centro de segurança - Privacidade - Termos - Contatos
      </div>
    </div>
  );
}
