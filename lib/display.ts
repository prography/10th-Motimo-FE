import { UserUpdateRqInterestsEnum } from "@/api/generated/motimo/Api";

export const UserUpdateRqInterestsEnumToKr = (
  from: UserUpdateRqInterestsEnum,
) => {
  switch (from) {
    case UserUpdateRqInterestsEnum.HEALTH:
      return "건강";
    case UserUpdateRqInterestsEnum.READING:
      return "독서";
    case UserUpdateRqInterestsEnum.STUDY:
      return "학업";
    case UserUpdateRqInterestsEnum.LANGUAGE:
      return "어학";
    case UserUpdateRqInterestsEnum.SPORTS:
      return "운동";
    case UserUpdateRqInterestsEnum.PROGRAMMING:
      return "프로그래밍";
    case UserUpdateRqInterestsEnum.CAREER:
      return "취업/이직";
    case UserUpdateRqInterestsEnum.SELF_IMPROVEMENT:
      return "자기개발";
    default:
      return "기타";
  }
};
