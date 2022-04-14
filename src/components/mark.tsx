/*
 * @Author: flh
 * @Date: 2022-04-14 16:30:14
 * @LastEditTime: 2022-04-14 16:37:13
 * @LastEditors: Please set LastEditors
 * @Description: 选择 搜索结果高亮显示
 * @FilePath: /jira/src/components/mark.tsx
 */

/**
 * 根据关键字 搜索出高亮的结果显示
 * @param param0
 */
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);

  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
