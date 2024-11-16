
import "./globals.css";
import Dash from  './components_app/Dash'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Dash></Dash>
        {children}
      </body>
    </html>
  );
}
