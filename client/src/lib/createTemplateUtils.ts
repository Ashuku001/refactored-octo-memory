import toast from "react-hot-toast";

export type NewStringParam = {
  rgx: any;
  ref: string;
  toTransForm: string;
  newVal: string;
  end: number;
};
export const newStringVar = ({
  rgx,
  ref,
  toTransForm,
  newVal,
  end,
}: NewStringParam) => {
  const start = rgx.exec(ref)?.index;
  let newString = toTransForm.replace(rgx, "");
  if (start && newString && (end || end === 0)) {
    const before = newString.substring(0, start);
    const after = newString.substring(start! + end);
    newString = before.concat(newVal).concat(after);
  } else {
    toast.error("Something went wrong. Contact support for help.");
  }
  return newString;
};

export const newStringInput = ({
  rgx,
  ref,
  toTransForm,
  newVal,
  end,
}: NewStringParam) => {
  const start = rgx.exec(ref)?.index;
  let newString = toTransForm;
  if (!!newVal.length) {
    newString = newString.replace(rgx, newVal);
  }
  if (start && newString && (end || end === 0)) {
    const before = newString.substring(0, start);
    const after = newString.substring(start! + end);
    newString = [before, newVal, after].join(" ");
  } else {
    toast.error("Something went wrong. Contact support for help.");
  }
  return newString;
};
