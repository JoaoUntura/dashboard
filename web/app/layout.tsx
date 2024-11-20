
import "./globals.css";
import Dash from  './components_app/Dash'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Dash />
        {children}
      </body>
    </html>
  );
}
