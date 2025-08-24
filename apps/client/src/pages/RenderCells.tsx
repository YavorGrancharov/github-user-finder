import { GithubUser } from "shared";
import Highlight from "@components/Highlight/Highlight";

export const renderCells = (items: GithubUser[], search: string) => {
  return (
    items?.map((item: GithubUser) => ({
      id: item.id,
      label: (
        <Highlight textToHighlight={search} fullText={item.username} />
      ),
      imageUrl: item.avatarUrl,
      count: item.publicReposCount,
      profileUrl: item.githubProfileUrl,
    })) || []
  );
};
