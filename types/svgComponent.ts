
// All for importing svg files and transforming it to components

declare module "*.svg" {
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}