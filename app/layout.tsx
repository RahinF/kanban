import { Inter } from 'next/font/google';
import { Modal } from '../components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kanban.',
  description: 'kanban board application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Modal />
      </body>
    </html>
  );
}
