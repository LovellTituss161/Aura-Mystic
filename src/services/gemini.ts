import { GoogleGenAI } from '@google/genai';
import { ReadingType, UserInput } from '../types';
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateReading(type: ReadingType, input: UserInput): Promise<string> {
  const category = CATEGORIES.find((c) => c.id === type);
  if (!category) throw new Error('Invalid reading type');

  const currentYear = new Date().getFullYear();

  let prompt = `Bạn là một chuyên gia hàng đầu, uy tín và nổi tiếng thế giới về ${category.title}. `;
  prompt += `Hãy thực hiện một bài phân tích sâu sắc, chính xác và chi tiết cho người dùng dưới đây. `;
  prompt += `Đặc biệt, hãy cập nhật dự đoán cho năm hiện tại là năm ${currentYear} nếu loại hình xem này có liên quan đến vận hạn hoặc xu hướng trong năm. `;
  prompt += `Hãy trình bày bằng tiếng Việt, sử dụng định dạng Markdown để bài viết rõ ràng, dễ đọc, có các tiêu đề phụ, in đậm những điểm quan trọng.\n\n`;

  prompt += `**Thông tin người dùng cung cấp:**\n`;
  if (input.fullName) prompt += `- Họ và tên: ${input.fullName}\n`;
  if (input.dob) prompt += `- Ngày tháng năm sinh: ${input.dob}\n`;
  if (input.tob) prompt += `- Giờ sinh: ${input.tob}\n`;
  if (input.pob) prompt += `- Nơi sinh: ${input.pob}\n`;
  if (input.gender) prompt += `- Giới tính: ${input.gender === 'male' ? 'Nam' : input.gender === 'female' ? 'Nữ' : 'Khác'}\n`;
  if (input.question) prompt += `- Câu hỏi/Vấn đề quan tâm: ${input.question}\n`;

  prompt += `\n**Yêu cầu chi tiết:**\n`;
  switch (type) {
    case 'than-so-hoc':
      prompt += `- Tính toán và phân tích Con số chủ đạo (Đường đời), Con số sứ mệnh, Con số linh hồn, và Con số nhân cách.\n`;
      prompt += `- Đưa ra lời khuyên về điểm mạnh, điểm yếu, và định hướng nghề nghiệp.\n`;
      prompt += `- Dự đoán tổng quan cho năm cá nhân của họ trong năm ${currentYear}.\n`;
      break;
    case 'tu-vi':
      prompt += `- Lập lá số tử vi dựa trên thông tin được cung cấp (giả định các sao chính).\n`;
      prompt += `- Phân tích các cung quan trọng: Mệnh, Thân, Tài Bạch, Quan Lộc, Phu Thê.\n`;
      prompt += `- Luận giải tiểu hạn năm ${currentYear}.\n`;
      break;
    case 'ban-do-sao':
      prompt += `- Phân tích Big 3: Cung Mặt Trời (Sun sign), Cung Mặt Trăng (Moon sign), và Cung Mọc (Ascendant).\n`;
      prompt += `- Chỉ ra các góc chiếu quan trọng hoặc vị trí các hành tinh nổi bật.\n`;
      prompt += `- Dự báo chiêm tinh cho họ trong năm ${currentYear}.\n`;
      break;
    case 'tarot':
      prompt += `- Rút ngẫu nhiên 3 lá bài Tarot (Quá khứ - Hiện tại - Tương lai hoặc Nguyên nhân - Hiện trạng - Lời khuyên) để trả lời câu hỏi của người dùng.\n`;
      prompt += `- Giải thích ý nghĩa từng lá bài trong bối cảnh câu hỏi.\n`;
      prompt += `- Đưa ra thông điệp tổng kết và lời khuyên hành động.\n`;
      break;
    case 'boi-bai-tay':
      prompt += `- Rút ngẫu nhiên một trải bài tây (ví dụ 3 lá hoặc 5 lá) phù hợp với câu hỏi.\n`;
      prompt += `- Giải mã ý nghĩa các chất (Cơ, Rô, Chuồn, Bích) và con số/hình ảnh trên lá bài.\n`;
      prompt += `- Đưa ra dự đoán ngắn hạn và lời khuyên thiết thực.\n`;
      break;
    case 'bat-tu':
      prompt += `- Phân tích Tứ Trụ (Năm, Tháng, Ngày, Giờ sinh) để tìm ra Nhật Can (Bản mệnh) và Dụng Thần/Hỷ Thần.\n`;
      prompt += `- Đánh giá sự cân bằng của Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) trong lá số.\n`;
      prompt += `- Luận đoán vận hạn năm ${currentYear} dựa trên sự tương tác giữa lưu niên và bát tự.\n`;
      break;
    case 'oracle':
      prompt += `- Rút ngẫu nhiên 1 hoặc 3 lá bài Oracle từ một bộ bài nổi tiếng (ví dụ: Wisdom of the Oracle, Work Your Light).\n`;
      prompt += `- Truyền đạt thông điệp chữa lành, trực giác và hướng dẫn tâm linh.\n`;
      prompt += `- Giúp người dùng kết nối lại với bản ngã bên trong để giải quyết vấn đề họ đang hỏi.\n`;
      break;
    case 'human-design':
      prompt += `- Phân tích Type (Loại hình năng lượng: Generator, Projector, Manifestor, Reflector), Strategy (Chiến lược), và Authority (Thẩm quyền quyết định).\n`;
      prompt += `- Giải thích Profile (Hồ sơ) và một số Center (Trung tâm năng lượng) nổi bật (xác định/không xác định).\n`;
      prompt += `- Đưa ra lời khuyên để họ sống đúng với thiết kế nguyên bản của mình trong năm ${currentYear}.\n`;
      break;
    case 'runes':
      prompt += `- Rút ngẫu nhiên 1 hoặc 3 viên đá Runes (Futhark cổ đại) để trả lời câu hỏi.\n`;
      prompt += `- Nêu tên viên đá, ý nghĩa biểu tượng và thông điệp cốt lõi.\n`;
      prompt += `- Đưa ra lời khuyên hành động cụ thể dựa trên năng lượng của các viên đá đó.\n`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || 'Không thể tạo kết quả. Vui lòng thử lại.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Đã có lỗi xảy ra khi kết nối với vũ trụ. Vui lòng thử lại sau.');
  }
}
