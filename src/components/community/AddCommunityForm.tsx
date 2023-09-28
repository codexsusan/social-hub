import { InputWithLabel } from "../common/InputWithLabel";
import {
  changeCommunityProfileImage,
  changeDescription,
  changeDisplayName,
  changeName,
  changeType,
} from "@/features/community/createCommunity";
import { Label } from "../ui/label";
import CustomSelect from "../common/CustomSelect";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProfileUploadButton from "../common/ProfileUploadButton";

function AddCommunityForm(props: { page: number }) {
  switch (props.page) {
    case 1:
      return <FieldAreaA />;
    case 2:
      return <FieldAreaB />;
  }
}

function FieldAreaA() {
  const dispatch = useAppDispatch();
  const community = useAppSelector((state) => state.community);
  const { name, displayName, description } = community.create;

  return (
    <>
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={(value: string) => {
          dispatch(changeName(value));
        }}
        value={name}
        id="communityname"
        label="Community Name"
        placeholder="Enter Community name"
        type="text"
      />
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={(value: string) => {
          dispatch(changeDisplayName(value));
        }}
        value={displayName}
        id="communitydisplayname"
        label="Community Display Name"
        placeholder="Enter Community display name"
        type="text"
      />
      <InputWithLabel
        inputClassName="bg-[#09090B] text-white"
        onValueChange={(value: string) => {
          dispatch(changeDescription(value));
        }}
        value={description}
        id="description"
        label="Description"
        placeholder="Enter description"
        type="text"
      />
      <div className="w-full flex flex-col gap-y-2">
        <Label className="text-slate-200" htmlFor="email">
          Community Type
        </Label>
        <CustomSelect
          onValueChange={(value: string) => {
            dispatch(changeType(value));
          }}
          options={["Public", "Private"]}
          placeholder="Select Community Type"
        />
      </div>
    </>
  );
}

function FieldAreaB() {
  const dispatch = useAppDispatch();
  const community = useAppSelector((state) => state.community);
  const { icon_image } = community.create;
  return (
    <div className="flex flex-col gap-y-2 ">
      <Label className="text-base">Community Icon</Label>
      <div className="flex justify-center ">
        <ProfileUploadButton
          callBackFn={(value: string) => {
            dispatch(changeCommunityProfileImage(value));
          }}
          value={icon_image!}
        />
      </div>
    </div>
  );
}

export default AddCommunityForm;
