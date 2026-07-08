const normalizeMarkdoc = (body: string): string => {
  return (
    body
      // コードブロック
      .replace(/```[\s\S]*?```/g, '')

      // インラインコード
      .replace(/`/g, '')

      // Markdocタグ
      .replace(/{%\s*\/?.*?%}/g, '')

      // HTMLコメント
      .replace(/<!--[\s\S]*?-->/g, '')

      // Markdown記法
      .replace(/^#{1,6}\s+/gm, '') // 見出し
      .replace(/^\s*[-*+]\s+/gm, '') // 箇条書き
      .replace(/^\s*\d+\.\s+/gm, '') // 番号付きリスト
      .replace(/\*\*(.*?)\*\*/g, '$1') // 太字
      .replace(/\*(.*?)\*/g, '$1') // 斜体
      .replace(/!$begin:math:display$\(\.\*\?\)$end:math:display$$begin:math:text$\.\*\?$end:math:text$/g, '$1') // 画像
      .replace(/$begin:math:display$\(\.\*\?\)$end:math:display$$begin:math:text$\.\*\?$end:math:text$/g, '$1') // リンク
      .replace(/^>\s?/gm, '') // 引用
      .replace(/^---$/gm, '') // 水平線

      // 改行・空白の正規化
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
};

export default normalizeMarkdoc;
