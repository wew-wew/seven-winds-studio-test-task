import folderIcon1 from '../../../../assets/folderIcon1.png';
import folderIcon2 from '../../../../assets/folderIcon2.png';
import documentIcon from '../../../../assets/documentIcon.png';
import { RowData } from '../../../../utility/dataTypes';

export const levelClassTypeSelector = ({ isFirst = false, rowData }: { isFirst?: boolean; rowData: RowData }) => {
  let iconClassName = 'tree-item';
  let icon;
  let level;

  if (rowData.parent === null) {
    icon = folderIcon1;
    level = 1;
  } else if (rowData.type === 'row') {
    iconClassName += ' tree-item-nested tree-item-nested-level2';
    if (isFirst) iconClassName += ' tree-item-nested-first';
    icon = documentIcon;
    level = 3;
  } else {
    if (isFirst) iconClassName += ' tree-item-nested tree-item-nested-level1 tree-item-nested-first';
    else iconClassName = 'tree-item tree-item-nested-level1 tree-item-nested-same-level';
    icon = folderIcon2;
    level = 2;
  }
  return { iconClassName, icon, level };
};