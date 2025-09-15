import "./globals.css";
import "../../../node_modules/flag-icons/css/flag-icons.min.css"
import { Poppins } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/layout/Header/Header"
import Providers from "@/components/provider";
import LanguageSwitcherModal from "@/components/layout/LanguageSwitcherModal";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });


export default async function LocaleLayout({
  children,
  modal,
  params
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  
  return (
    <html lang={locale}>
      <body className={`${poppins.className} max-w-screen min-h-screen flex  flex-col p-2`}>
        <NextIntlClientProvider>
          <Providers >
            <Header />
            {modal}
            {children}
           <LanguageSwitcherModal/>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}