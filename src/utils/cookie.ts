export function getCookie(name: string): string | undefined {
  //타입을 위처럼 정확히 해줘야 함. 리턴타입까지 정확히..!
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
