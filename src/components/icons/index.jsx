// components/icons/index.tsx

// Ionicons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import {
  IoCheckboxOutline,
  IoCheckbox,
  IoHomeSharp,
  IoHomeOutline,
  IoDocumentTextOutline,
  IoDocumentText,
  IoBookOutline,
  IoBook,
  IoPersonOutline,
  IoPerson,
  IoFolderOpenOutline,
  IoFolderOpen,
  IoAdd,
  IoShareSocial,
  IoPeople,
  IoSearch,
  IoInformationCircle,
} from "react-icons/io5";

// Material Design
import { MdKeyboardVoice } from "react-icons/md";

// Bootstrap
import { BsBuilding } from "react-icons/bs";

// BoxIcons
import { BiSolidMap } from "react-icons/bi";

// AntDesign
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

// FontAwesome
import { FaUserEdit } from "react-icons/fa";

// Feather
import { FiUpload } from "react-icons/fi";

export const Icons = {
  // 방향
  ArrowForward: IoIosArrowForward,
  ArrowBack: IoIosArrowBack,

  // 체크박스
  CheckboxInactive: IoCheckboxOutline,
  CheckboxActive: IoCheckbox,

  // 네비게이션바
  HomeActive: IoHomeSharp,
  HomeInactive: IoHomeOutline,
  DocumentActive: IoDocumentText,
  DocumentInactive: IoDocumentTextOutline,
  BookActive: IoBook,
  BookInactive: IoBookOutline,
  PersonActive: IoPerson,
  PersonInactive: IoPersonOutline,
  FolderActive: IoFolderOpen,
  FolderInactive: IoFolderOpenOutline,

  // 기능
  Add: IoAdd,
  Share: IoShareSocial,
  Search: IoSearch,
  Info: IoInformationCircle,
  Close: AiOutlineClose,

  // 기타 UI
  Voice: MdKeyboardVoice,
  Building: BsBuilding,
  People: IoPeople,
  Map: BiSolidMap,
  UserEdit: FaUserEdit,
  ResumeEdit: AiOutlineEdit,
  Upload: FiUpload,
};
