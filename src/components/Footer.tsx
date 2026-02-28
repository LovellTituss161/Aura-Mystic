import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-indigo-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-indigo-300">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()}: Aura Mystic - Khám phá bên trong bạn thông qua lăng kính huyền học.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.facebook.com/lovelltitussof1910"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center group"
          >
            <Facebook className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/ngothuanlt_bap/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center group"
          >
            <Instagram className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
