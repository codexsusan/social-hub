import Output from "editorjs-react-renderer";

const style = {
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustomImageRenderer,
  //   code: CustomCodeRenderer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomOutput({ content }: { content: any }) {
  return (
    <Output
      className="text-white border"
      style={style}
      data={content}
      renderer={renderers}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <img alt="image" className="object-contain border-2" src={src} />
    </div>
  );
}

export default CustomOutput;
