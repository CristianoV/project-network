import logo from '../../../public/orkutLogo.png';
import Image from 'next/image';

export default function Login() {
  return (
    <div>
      <div>
        <Image src={logo} alt='logo' width={500} height={500} />
      </div>
      <div>x</div>
    </div>
  );
}
