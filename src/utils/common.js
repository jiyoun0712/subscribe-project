/**
 * HTML 태그를 유지하면서 텍스트를 100자 이내로 자르는 함수
 * @param {string} content - HTML 컨텐츠
 * @param {number} limit - 자르고 싶은 문자 길이 (기본값 100)
 * @returns {string} 잘린 HTML 문자열
 */
export const trundcateHtmlContent = (content, limit = 100) => {
    let truncated = '';
    let charCount = 0;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);

    while(walker.nextNode()){
        const node = walker.currentNode;
        const remainingChars = limit - charCount;

        if(node.nodeValue && charCount < limit){
            if(node.nodeValue.length > remainingChars){
                truncated += node.nodeValue.slice(0, remainingChars);
                charCount += remainingChars;
            } else {
                truncated += node.nodeValue;
                charCount += node.nodeValue.length;
            }
        }
    }
}

/**
 * 개행 문자를 <br />로 변환하는 함수
 * @param {string} text - 줄바꿈 포함된 텍스트
 * @returns 줄바꿈을 <br />로 치환된 문자열
 */
export const convertNewlineToBreak = (text) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };