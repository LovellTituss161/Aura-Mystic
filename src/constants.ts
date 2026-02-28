import { ReadingCategory } from './types';

export const CATEGORIES: ReadingCategory[] = [
  {
    id: 'than-so-hoc',
    title: 'Thần Số Học',
    description: 'Khám phá ý nghĩa các con số qua ngày sinh và tên gọi của bạn.',
    icon: 'Hash',
    requiredFields: ['fullName', 'dob'],
  },
  {
    id: 'tu-vi',
    title: 'Tử Vi',
    description: 'Dự đoán vận mệnh, sự nghiệp và tình duyên qua lá số tử vi.',
    icon: 'Scroll',
    requiredFields: ['fullName', 'dob', 'tob', 'gender'],
  },
  {
    id: 'ban-do-sao',
    title: 'Bản Đồ Sao',
    description: 'Chiêm tinh học phương Tây, giải mã tính cách qua các chòm sao.',
    icon: 'Star',
    requiredFields: ['fullName', 'dob', 'tob', 'pob'],
  },
  {
    id: 'tarot',
    title: 'Tarot',
    description: 'Nhận thông điệp từ vũ trụ qua các lá bài Tarot huyền bí.',
    icon: 'Layers',
    requiredFields: ['question'],
  },
  {
    id: 'boi-bai-tay',
    title: 'Bói Bài Tây',
    description: 'Dự đoán tương lai gần qua bộ bài 52 lá truyền thống.',
    icon: 'Spade',
    requiredFields: ['question'],
  },
  {
    id: 'bat-tu',
    title: 'Bát Tự (Tứ Trụ)',
    description: 'Phân tích ngũ hành, vận hạn qua năm, tháng, ngày, giờ sinh.',
    icon: 'Compass',
    requiredFields: ['fullName', 'dob', 'tob', 'gender'],
  },
  {
    id: 'oracle',
    title: 'Oracle',
    description: 'Những lời khuyên sâu sắc và chữa lành từ các lá bài Oracle.',
    icon: 'Sparkles',
    requiredFields: ['question'],
  },
  {
    id: 'human-design',
    title: 'Human Design',
    description: 'Bản thiết kế con người, sự kết hợp của nhiều hệ thống huyền học.',
    icon: 'Fingerprint',
    requiredFields: ['fullName', 'dob', 'tob', 'pob'],
  },
  {
    id: 'runes',
    title: 'Cổ Ngữ Runes',
    description: 'Gieo quẻ bằng các ký tự cổ đại Bắc Âu để tìm hướng đi.',
    icon: 'Gem',
    requiredFields: ['question'],
  },
];
