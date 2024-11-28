import { notifications } from "@mantine/notifications";

export const shareLink = async (options: {
  title: string;
  text: string;
  url: string;
}) => {
  const { title, text, url } = options;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      console.log("링크를 공유했습니다!");
      notifications.show({
        title: "링크 공유 성공",
        message: "링크를 공유했습니다! 🌟",
        color: "red",
      });
    } catch (error) {
      console.error("링크 공유에 실패했습니다.", error);
      throw new Error("링크 공유에 실패했습니다.");
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사에 실패했습니다.", error);
      alert("링크 복사에 실패했습니다.");
      throw new Error("링크 복사에 실패했습니다.");
    }
  }
};
