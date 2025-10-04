import "./globals.css";



export const metadata = {
  title: "A Moment in Time",
  description: "Where memories become eternal and moments become treasures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scrollbar-hide">
        {children}
      </body>
    </html>
  );
}
