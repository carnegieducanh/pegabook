import { useState } from "react";
import { Button, Datepicker, Label, TextInput, Textarea } from "flowbite-react";
import { BsFillSendFill } from "react-icons/bs";
import { RiMailSendLine, RiMessage3Line } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";
import emailjs from "@emailjs/browser";

const EMAILJS = {
  serviceId: "service_fl9nzck",
  templateId: "template_md4bn27",
  publicKey: "62seVVbY10pzmV4fj",
};

const NOTICE_MESSAGES = [
  "Để đảm bảo bạn có thể hoàn thành việc đọc hiệu quả, bạn chỉ nên mượn tối đa 2 cuốn sách cho mỗi lần.",
  "Mỗi cuốn sách giống như một người bạn thông thái, hãy trân trọng và giữ gìn cẩn thận nhé.",
];

// ---- Helper sub-components ----

const DateField = ({ id, label }) => (
  <div className="w-1/2">
    <Label
      htmlFor={id}
      value={label}
      className="mb-2 block whitespace-nowrap"
    />
    <Datepicker id={id} name={id} />
  </div>
);

const FormField = ({ id, label, placeholder, defaultValue, half }) => (
  <div className={half ? "w-1/2" : "w-full"}>
    <Label htmlFor={id} value={label} className="mb-2 block" />
    <TextInput
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      defaultValue={defaultValue}
      readOnly
      required
    />
  </div>
);

// ---- Main component ----

const BorrowForm = ({ bookTitle, authorName, sharerEmail }) => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to send this mail?")) return;

    emailjs.sendForm(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      e.target,
      EMAILJS.publicKey,
    );
    alert("Message sent successfully.");
    setIsSent(true);
  };

  return (
    <div className="mb-5">
      {/* Thông báo từ Pegabook */}
      <div className="mb-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <RiMailSendLine />
          <h2 className="font-title text-2xl font-medium text-pink-800">
            Bạn có tin nhắn từ đội ngũ Pegabook!
          </h2>
        </div>
        <div className="flex flex-col gap-2 px-4">
          {NOTICE_MESSAGES.map((msg, i) => (
            <div key={i} className="flex gap-2">
              <RiMessage3Line />
              <p className="text-md">{msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form đăng ký mượn */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-4">
        {/* Ngày mượn / trả */}
        <div className="flex gap-8">
          <DateField id="borrowedDate" label="Ngày bạn muốn mượn" />
          <DateField id="returnDate" label="Ngày bạn dự định trả" />
        </div>

        {/* Lời nhắn */}
        <div>
          <Label
            htmlFor="comment"
            value="Lời nhắn của bạn"
            className="mb-2 block"
          />
          <Textarea
            id="comment"
            name="comment"
            placeholder="Viết lời nhắn của bạn đến Pegabook hoặc người chia sẻ sách..."
            required
            rows={2}
          />
        </div>

        {/* Email người chia sẻ (ẩn) */}
        <TextInput
          id="email"
          name="email"
          type="text"
          defaultValue={sharerEmail}
          readOnly
          required
          className="hidden"
        />

        {/* Thông tin người mượn */}
        <h2 className="text-xl font-medium">Thông tin về bạn</h2>
        <FormField
          id="memberName"
          label="Tên của bạn"
          placeholder="Member name"
        />
        <div className="flex gap-8">
          <FormField
            id="memberID"
            label="Mã thành viên"
            placeholder="Member ID"
            half
          />
          <FormField
            id="workPlace"
            label="Nơi làm việc"
            placeholder="Work Place"
            half
          />
        </div>

        {/* Thông tin sách */}
        <div className="flex gap-8">
          <FormField
            id="bookTitle"
            label="Tên sách mượn"
            placeholder="Tên sách"
            defaultValue={bookTitle}
            half
          />
          <FormField
            id="authorName"
            label="Tên tác giả"
            placeholder="Tên tác giả"
            defaultValue={authorName}
            half
          />
        </div>

        <Button
          type="submit"
          className="bg-brand dark:bg-brand mb-2"
          disabled={isSent}
        >
          <span className="flex items-center gap-2">
            Đăng ký mượn sách <BsFillSendFill />
          </span>
        </Button>

        <Button
          className="bg-cobalt dark:bg-cobalt mb-5"
          onClick={() => (window.location.href = "/all-books")}
        >
          <span className="flex items-center gap-2">
            Quay lại thư viện <TiArrowBackOutline size={24} />
          </span>
        </Button>
      </form>
    </div>
  );
};

export default BorrowForm;
