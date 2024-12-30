import path from "path";
import fs from "fs";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Markdown from "../../components/Markdown";
import Link from "next/link";
import { GetStaticPaths } from "next/types";

let uniqueIDCounter = 0;

export function getDocID(): number {
	return ++uniqueIDCounter;
}

export class DocPageGroup {
	constructor(
		public content: string,
		public pages: DocPage[],
	) {}
}

export interface DocPage {
	id: number;
	title: string;
	index: number;
	slugComponent: string;
	fullPath: string;
	content: string | DocPageGroup;
	previous?: { title: string; path: string };
	next?: { title: string; path: string };
}

const findPreviousPage = (page: DocPage): DocPage => {
	if (typeof page.content === "string") {
		return page;
	} else {
		return findPreviousPage(
			(page.content as DocPageGroup).pages[
				(page.content as DocPageGroup).pages.length - 1
			],
		);
	}
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
	const getDocPages = (
		root: string,
		slugPrefix: string,
	): { pages: DocPage[]; paths: string[] } => {
		const fileNames = fs.readdirSync(root);
		let result: DocPage[] = [];
		let allPaths: string[] = [];
		for (let i = 0; i < fileNames.length; i++) {
			const p = fileNames[i];
			const itPath = path.join(root, p);
			const itStat = fs.statSync(itPath);
			if (itStat.isFile()) {
				const parsedPath = path.parse(itPath);
				if (
					fs.existsSync(path.join(root, parsedPath.name)) ||
					parsedPath.ext !== ".mdx"
				) {
					continue;
				}
				const itName = path.parse(itPath).name;
				const content = fs.readFileSync(itPath).toString();
				const [headStr, contentStr] = content.split("---");
				let [titleStr, indexStr, slugStr = ""] = headStr.split("\n");
				if (slugStr.length === 0) {
					slugStr = itName;
				} else {
					slugStr = slugStr.split(": ")[1];
				}
				const currSlug = path.join(slugPrefix, slugStr);
				allPaths.push(currSlug);
				result.push({
					id: getDocID(),
					title: titleStr.split(": ")[1],
					index: Number(indexStr.split(": ")[1]),
					slugComponent: slugStr,
					fullPath: currSlug,
					content: contentStr,
				});
			} else {
				const content = fs.existsSync(itPath + ".mdx")
					? fs.readFileSync(itPath + ".mdx").toString()
					: "";
				let title = p;
				let index = 0;
				let slug = title;
				let contentValue = "";
				if (content.length > 0) {
					const [headStr, contentStr] = content.split("---");
					const [titleStr, indexStr, slugStr = ""] = headStr.split("\n");
					contentValue = contentStr;
					title = titleStr.split(": ")[1];
					index = Number(indexStr.split(": ")[1]);
					if (slugStr.length > 0) {
						slug = slugStr.split(": ")[1];
					}
				}
				const currSlug = path.join(slugPrefix, slug);
				allPaths.push(currSlug);
				const children = getDocPages(itPath, currSlug);
				children.pages.sort((a, b) => a.index - b.index);
				allPaths.push(...children.paths);
				result.push({
					id: getDocID(),
					title: title,
					index: index,
					slugComponent: slug,
					fullPath: currSlug,
					content: { content: contentValue, pages: children.pages },
					next:
						children.pages.length > 0
							? {
									title: children.pages[0].title,
									path: children.pages[0].fullPath,
								}
							: undefined,
				});
				children.pages[0].previous = {
					title: result[result.length - 1].title,
					path: result[result.length - 1].fullPath,
				};
			}
		}
		result.sort((a, b) => a.index - b.index);
		for (let i = 1; i < result.length; i++) {
			let latestPage = findPreviousPage(result[i - 1]);
			latestPage.next = {
				title: result[i].title,
				path: result[i].fullPath,
			};
			result[i].previous = {
				title: latestPage.title,
				path: latestPage.fullPath,
			};
		}
		return { pages: result, paths: allPaths };
	};

	const rootPages = getDocPages(path.resolve("./docs"), "/docs");
	rootPages.paths.push("/docs");

	return {
		paths: rootPages.paths,
		fallback: "blocking",
	};
};

export async function getStaticProps(_ctx: any) {
	const getDocPages = (
		root: string,
		slugPrefix: string,
	): { pages: DocPage[]; paths: string[] } => {
		const fileNames = fs.readdirSync(root);
		let result: DocPage[] = [];
		let allPaths: string[] = [];
		for (let i = 0; i < fileNames.length; i++) {
			const p = fileNames[i];
			const itPath = path.join(root, p);
			const itStat = fs.statSync(itPath);
			if (itStat.isFile()) {
				const parsedPath = path.parse(itPath);
				if (
					fs.existsSync(path.join(root, parsedPath.name)) ||
					parsedPath.ext !== ".mdx"
				) {
					continue;
				}
				const itName = path.parse(itPath).name;
				const content = fs.readFileSync(itPath).toString();
				const [headStr, contentStr] = content.split("---");
				let [titleStr, indexStr, slugStr = ""] = headStr.split("\n");
				if (slugStr.length === 0) {
					slugStr = itName;
				} else {
					slugStr = slugStr.split(": ")[1];
				}
				const currSlug = path.join(slugPrefix, slugStr);
				allPaths.push(currSlug);
				result.push({
					id: getDocID(),
					title: titleStr.split(": ")[1],
					index: Number(indexStr.split(": ")[1]),
					slugComponent: slugStr,
					fullPath: currSlug,
					content: contentStr,
				});
			} else {
				const content = fs.existsSync(itPath + ".mdx")
					? fs.readFileSync(itPath + ".mdx").toString()
					: "";
				let title = p;
				let index = 0;
				let slug = title;
				let contentValue = "";
				if (content.length > 0) {
					const [headStr, contentStr] = content.split("---");
					const [titleStr, indexStr, slugStr = ""] = headStr.split("\n");
					contentValue = contentStr;
					title = titleStr.split(": ")[1];
					index = Number(indexStr.split(": ")[1]);
					if (slugStr.length > 0) {
						slug = slugStr.split(": ")[1];
					}
				}
				const currSlug = path.join(slugPrefix, slug);
				allPaths.push(currSlug);
				const children = getDocPages(itPath, currSlug);
				children.pages.sort((a, b) => a.index - b.index);
				allPaths.push(...children.paths);
				result.push({
					id: getDocID(),
					title: title,
					index: index,
					slugComponent: slug,
					fullPath: currSlug,
					content: { content: contentValue, pages: children.pages },
					next:
						children.pages.length > 0
							? {
									title: children.pages[0].title,
									path: children.pages[0].fullPath,
								}
							: undefined,
				});
				children.pages[0].previous = {
					title: result[result.length - 1].title,
					path: result[result.length - 1].fullPath,
				};
			}
		}
		result.sort((a, b) => a.index - b.index);
		for (let i = 1; i < result.length; i++) {
			let latestPage = findPreviousPage(result[i - 1]);
			latestPage.next = {
				title: result[i].title,
				path: result[i].fullPath,
			};
			result[i].previous = {
				title: latestPage.title,
				path: latestPage.fullPath,
			};
		}
		return { pages: result, paths: allPaths };
	};

	return {
		props: {
			files: getDocPages(path.resolve("./docs"), "/docs").pages,
		},
	};
}

interface HighlightUnit {
	start: number;
	end: number;
}

interface ResultSegment {
	start: number;
	end: number;
	highlights: HighlightUnit[];
}

interface SearchResult {
	title: string;
	content: string;
	path: string;
	result: { title: ResultSegment[]; content: ResultSegment[] };
}

function getHighlightUnitsFromSegments(seg: ResultSegment[]): HighlightUnit[] {
	let result: HighlightUnit[] = [];
	for (let i = 0; i < seg.length; i++) {
		result.push(...seg[i].highlights);
	}
	return result;
}

function findBreakBefore(value: string, index: number): number {
	for (let i = index; i > 0; i--) {
		if (value[i] === "\n") {
			return i;
		}
	}
	return 0;
}

function findBreakAfter(value: string, index: number): number {
	for (let i = index; i < value.length; i++) {
		if (value[i] === "\n") {
			return i;
		}
	}
	return value.length;
}

function searchInString(source: string, str: string): ResultSegment[] {
	if (source.indexOf(str) > -1) {
		let ind = 0;
		let start = 0;
		let end = 0;
		let segments: ResultSegment[] = [];
		while (source.indexOf(str, ind) > -1) {
			ind = source.indexOf(str, ind);
			start = findBreakBefore(source, ind);
			end = findBreakAfter(source, ind + str.length);
			segments.push({
				start: start,
				end: end,
				highlights: [{ start: ind, end: ind + str.length }],
			});
			for (let j = ind + str.length; j < end; j++) {
				if (source.indexOf(str, j) > -1) {
					const newInd = source.indexOf(str, j);
					segments[segments.length - 1].highlights.push({
						start: newInd,
						end: newInd + str.length,
					});
					j = newInd + str.length - 1;
				}
			}
			ind = end;
		}
		return segments;
	} else {
		return [];
	}
}

function getHighlightSpans(
	value: string,
	results: HighlightUnit[],
	offset: number,
): string {
	if (results.length === 0) {
		return value;
	}
	let nodes: string = "";
	nodes += value.substring(0, results[0].start - offset);
	for (let i = 0; i < results.length; i++) {
		if (i !== 0) {
			if (results[i - 1].end - offset < results[i].start - offset) {
				nodes += value.substring(
					results[i - 1].end - offset,
					results[i].start - offset,
				);
			}
		}
		nodes +=
			"<span style='background-color: orange; color: black;'>" +
			value.substring(results[i].start - offset, results[i].end - offset) +
			"</span>";
	}
	if (results[results.length - 1].end - offset < value.length) {
		nodes += value.substring(results[results.length - 1].end - offset);
	}
	return nodes;
}

export default function Page(props: { files: DocPage[] }) {
	const [activePage, setActivePage] = useState<DocPage | null>(null);
	const isActivePage = (page: DocPage): boolean => {
		return activePage !== null && page.id === activePage.id;
	};

	const router = useRouter();
	const { slug } = router.query;

	const findPageAtSlug = (
		pages: DocPage[],
		slugVal: string[],
	): { page: DocPage | null; incomplete: boolean } => {
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].slugComponent === slugVal[0]) {
				if (1 === slugVal.length) {
					return { page: pages[i], incomplete: false };
				} else if (typeof pages[i].content !== "string") {
					return findPageAtSlug(
						(pages[i].content as DocPageGroup).pages,
						slugVal.toSpliced(0, 1),
					);
				} else {
					return { page: pages[i], incomplete: true };
				}
			}
		}
		return { page: null, incomplete: false };
	};

	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [searchCandidate, setSearchCandidate] = useState<string>("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const resetSearch = (clear: boolean) => {
		setSearchVisible(false);
		if (clear) {
			setSearchCandidate("");
			setSearchResults([]);
		}
	};

	let searchShouldCancel = false;
	let searchOngoing = false;

	const [highlightParts, setHighlightParts] = useState<{
		title: HighlightUnit[];
		content: HighlightUnit[];
	} | null>(null);

	const searchInPages = (pages: DocPage[], str: string): SearchResult[] => {
		let searchRes: SearchResult[] = [];
		if (searchShouldCancel) {
			return [];
		}
		for (let i = 0; i < pages.length; i++) {
			if (searchShouldCancel) {
				return [];
			}
			const titleRes = searchInString(pages[i].title, str);
			let contentRes: ResultSegment[] = [];
			if (searchShouldCancel) {
				return [];
			}
			if (typeof pages[i].content === "string") {
				contentRes = searchInString(pages[i].content as string, str);
				if (searchShouldCancel) {
					return [];
				}
			} else {
				const group = pages[i].content as DocPageGroup;
				if (group.content.length > 0) {
					contentRes = searchInString(group.content, str);
					if (searchShouldCancel) {
						return [];
					}
				}
				const groupRes = searchInPages(group.pages, str);
				if (searchShouldCancel) {
					return [];
				}
				searchRes.push(...groupRes);
				if (searchShouldCancel) {
					return [];
				}
			}
			if (titleRes.length > 0 || contentRes.length > 0) {
				if (searchShouldCancel) {
					return [];
				}
				searchRes.push({
					title: pages[i].title,
					content:
						contentRes.length > 0
							? typeof pages[i].content === "string"
								? (pages[i].content as string)
								: (pages[i].content as DocPageGroup).content
							: "",
					path: pages[i].fullPath,
					result: { title: titleRes, content: contentRes },
				});
				if (searchShouldCancel) {
					return [];
				}
			}
		}
		if (searchShouldCancel) {
			return [];
		}
		return searchRes;
	};

	const [unknownPath, setUnknownPath] = useState<string | null>();

	useEffect(() => {
		if (slug) {
			const pageRes = findPageAtSlug(props.files, slug as string[]);
			if (pageRes.page !== null) {
				if (pageRes.incomplete) {
					setActivePage(pageRes.page);
					setUnknownPath((slug as string[]).join("/"));
					router.push({ pathname: pageRes.page.fullPath }, undefined, {
						shallow: true,
					});
				} else {
					setActivePage(pageRes.page);
					router.push({ pathname: pageRes.page.fullPath }, undefined, {
						shallow: true,
					});
				}
			} else {
				setActivePage(props.files[0]);
				setUnknownPath((slug as string[]).join("/"));
				router.push({ pathname: props.files[0].fullPath }, undefined, {
					shallow: true,
				});
			}
		} else {
			setActivePage(props.files[0]);
			router.push({ pathname: props.files[0].fullPath }, undefined, {
				shallow: true,
			});
		}
	}, []);

	return (
		<div className="flex flex-col w-[100%] h-[85vh]">
			<title>Learn | QAT Programming Language</title>
			<div className="flex flex-col self-center pt-5 h-full w-full">
				{unknownPath && (
					<div className="flex flex-row bg-orange-400 text-black px-4 py-2 rounded-lg w-fit">
						Could not find the path{" "}
						<p className="font-bold px-2">{unknownPath}</p> in the
						documentation. You have been redirected
					</div>
				)}
				<div className="flex flex-col md:flex-row h-full">
					<div className="md:flex md:flex-col h-full min-w-[15rem] w-[15rem] overflow-y-auto hidden px-4 border-solid border-r-2 border-r-styleGray">
						{props.files.flatMap((it) => {
							return (
								<MenuItem
									onClick={(item: DocPage) => {
										setActivePage(item);
										router.push(
											{ pathname: item.fullPath },
											undefined,
											{ shallow: true },
										);
									}}
									isActiveFn={isActivePage}
									item={it}
								/>
							);
						})}
					</div>
					{activePage !== null && (
						<div className="flex flex-col w-full">
							<div className="flex flex-row w-full px-4 mb-5">
								<input
									className="pl-4 pr-12 py-2 border-2 border-solid border-[#00000044] dark:border-[#ffffff44] text-xl rounded-xl w-full md:w-[50%]"
									placeholder="Search in docs..."
									type="text"
									value={searchCandidate}
									onFocus={() => {
										if (searchCandidate.length > 0) {
											setSearchVisible(true);
										}
									}}
									onInput={async (ev: any) => {
										setSearchCandidate(ev.target.value as string);
										if (searchOngoing) {
											searchShouldCancel = true;
										}
										while (searchOngoing) {}
										searchShouldCancel = false;
										if ((ev.target.value as string).length > 0) {
											setSearchVisible(true);
											searchOngoing = true;
											const pageRes = searchInPages(
												props.files,
												ev.target.value,
											);
											if (searchShouldCancel) {
												searchOngoing = false;
												return;
											}
											setSearchResults(pageRes);
											searchOngoing = false;
										} else {
											setSearchVisible(false);
										}
									}}
								/>
								<div
									className="flex flex-col transition-all hover:rotate-180 active:rotate-[-360deg] mr-8 w-8 h-8 -ml-11 self-center cursor-pointer"
									onClick={() => {
										resetSearch(true);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										version="1.1"
										width="2rem"
										height="2rem"
										viewBox="0 0 640 640"
									>
										<g
											transform="matrix(1.5 0 0 1.5 320 320)"
											id="QMD9oH3WLUqF1RSMCCTrM"
										>
											<path
												className="fill-[#999999] dark:fill-[#666666]"
												style={{
													stroke: "rgb(191,1,62)",
													strokeWidth: 0,
													strokeDasharray: "none",
													strokeLinecap: "butt",
													strokeDashoffset: 0,
													strokeLinejoin: "miter",
													strokeMiterlimit: 4,
													fillRule: "nonzero",
													opacity: 1,
												}}
												vector-effect="non-scaling-stroke"
												transform=" translate(0, 0)"
												d="M 0 -199.11111 C 109.90933 -199.11111 199.11111 -109.90933 199.11111 0 C 199.11111 109.90933 109.90933 199.11111 0 199.11111 C -109.90933 199.11111 -199.11111 109.90933 -199.11111 0 C -199.11111 -109.90933 -109.90933 -199.11111 0 -199.11111 z"
												stroke-linecap="round"
											/>
										</g>
										<g
											transform="matrix(7.48 0 0 7.48 320 319.72)"
											id="iMdIJcWx0hiybONVYMpwy"
										>
											<path
												className="fill-white dark:fill-black"
												style={{
													stroke: "none",
													strokeWidth: 1,
													strokeDasharray: "none",
													strokeLinecap: "butt",
													strokeDashoffset: 0,
													strokeLinejoin: "miter",
													strokeMiterlimit: 4,
													fillRule: "nonzero",
													opacity: 1,
												}}
												vector-effect="non-scaling-stroke"
												transform=" translate(-40, -39.9625)"
												d="M 59.2 28.2 L 47.4 40 L 59.2 51.8 C 61.300000000000004 53.9 61.300000000000004 57.199999999999996 59.2 59.199999999999996 C 58.2 60.199999999999996 56.800000000000004 60.699999999999996 55.5 60.699999999999996 C 54.199999999999996 60.699999999999996 52.8 60.199999999999996 51.8 59.199999999999996 L 40 47.4 L 28.2 59.2 C 27.2 60.2 25.8 60.7 24.5 60.7 C 23.2 60.7 21.8 60.2 20.8 59.2 C 18.7 57.1 18.7 53.800000000000004 20.8 51.800000000000004 L 32.6 40 L 20.8 28.2 C 18.7 26.099999999999998 18.7 22.799999999999997 20.8 20.799999999999997 C 22.900000000000002 18.799999999999997 26.200000000000003 18.699999999999996 28.200000000000003 20.799999999999997 L 40 32.6 L 51.8 20.8 C 53.9 18.7 57.199999999999996 18.7 59.199999999999996 20.8 C 61.199999999999996 22.900000000000002 61.3 26.2 59.2 28.2 z"
												stroke-linecap="round"
											/>
										</g>
									</svg>
								</div>
								<div className="flex flex-row fixed md:relative w-full md:flex-grow bottom-3 md:bottom-0 left-0 px-3 md:px-0">
									{activePage && activePage.previous && (
										<ChangePage
											onClick={() => {
												resetSearch(false);
												const pageRes = findPageAtSlug(
													props.files,
													activePage!
														.previous!.path.split("/")
														.toSpliced(0, 2),
												);
												router.push(
													{ pathname: activePage!.previous!.path },
													undefined,
													{ shallow: true },
												);
												setActivePage(pageRes.page!);
											}}
											type="Previous"
											name={activePage!.previous!.title}
										/>
									)}
									<div className="flex-grow"></div>
									{activePage && activePage.next && (
										<ChangePage
											onClick={() => {
												resetSearch(false);
												const pageRes = findPageAtSlug(
													props.files,
													activePage!
														.next!.path.split("/")
														.toSpliced(0, 2),
												);
												router.push(
													{ pathname: activePage!.next!.path },
													undefined,
													{ shallow: true },
												);
												setActivePage(pageRes.page!);
											}}
											type="Next"
											name={activePage!.next!.title}
										/>
									)}
								</div>
							</div>
							<div className="flex flex-col flex-grow px-4 overflow-y-auto">
								{searchVisible ? (
									searchResults.length > 0 ? (
										<div className="flex flex-col w-full pb-20">
											<p className="text-left pl-4">
												{searchResults.length.toString()}{" "}
												{searchResults.length === 1
													? "page "
													: "pages "}
												found
											</p>
											{searchResults.flatMap((it) => {
												return (
													<div className="my-4 mx-4 px-4 py-4 border-2 border-solid border-styleGray rounded-xl bg-[#ffffff77] dark:bg-[#00000077]">
														<div className="mb-4 px-2 py-1 bg-[#00000022] dark:bg-[#ffffff22] w-fit rounded">
															{it.path}
														</div>
														<div
															className="text-3xl font-bold text-left"
															dangerouslySetInnerHTML={{
																__html: getHighlightSpans(
																	it.title,
																	getHighlightUnitsFromSegments(
																		it.result.title,
																	),
																	0,
																),
															}}
														/>
														{it.result.content.length > 0 && (
															<div className="mt-4">
																{it.result.content.flatMap(
																	(cont, i) => (
																		<div className="flex flex-col">
																			<div className="py-2">
																				<Markdown allowHTML>
																					{getHighlightSpans(
																						it.content.substring(
																							cont.start,
																							cont.end,
																						),
																						cont.highlights,
																						cont.start,
																					)}
																				</Markdown>
																			</div>
																			{i !==
																				it.result.content
																					.length -
																					1 && (
																				<div className="px-2 self-end rounded bg-[#00000011] dark:bg-[#ffffff] text-[#00000077] dark:text-[#ffffff55] w-fit">
																					• • • • • • •
																				</div>
																			)}
																		</div>
																	),
																)}
															</div>
														)}
													</div>
												);
											})}
										</div>
									) : (
										<div className="text-2xl text-center mt-5">
											Could not find anything
											<p>...</p>
										</div>
									)
								) : (
									<>
										<div className="text-4xl font-bold text-left mb-6">
											{activePage.title}
										</div>
										{typeof activePage!.content === "string" ? (
											<Markdown
												allowHTML
												className="text-lg mb-32"
												children={activePage!.content as string}
											/>
										) : (
											<div className="flex flex-col mb-32">
												{(
													activePage.content as DocPageGroup
												).pages.flatMap((d) => {
													return (
														<div className="px-4 py-2 text-xl font-bold">
															{d.title}
														</div>
													);
												})}
											</div>
										)}
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function ChangePage(props: {
	onClick: () => void;
	type: string;
	name: string;
}) {
	return (
		<div
			onClick={props.onClick}
			className="bg-white dark:bg-black select-none border-2 active:bg-white active:border-white dark:active:bg-black dark:active:border-black hover:text-white hover:bg-styleGreen dark:hover:bg-styleGreen px-3 py-1 border-solid border-gray-400 dark:border-gray-600 hover:border-transparent hover:dark:border-transparent cursor-pointer rounded-xl flex flex-col md:w-[49%]"
			style={{
				textAlign: props.type === "Previous" ? "left" : "right",
			}}
		>
			<div className="text-sm tracking-widest uppercase">{props.type}</div>
			<div className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
				{props.name}
			</div>
		</div>
	);
}

function MenuItem(props: {
	onClick: (page: DocPage) => void;
	isActiveFn: (page: DocPage) => boolean;
	item: DocPage;
}) {
	const [isExpanded, setExpanded] = useState<boolean>(false);
	useEffect(() => {
		setExpanded(props.isActiveFn(props.item));
	}, []);
	return (
		<div className="flex flex-col my-1 select-none">
			<div className="flex flex-row">
				<p
					className="flex-grow hover:bg-[#00000022] dark:hover:bg-[#ffffff22] active:bg-black active:text-white text-left py-1 px-3 rounded-lg text-[#555555] font-bold dark:text-[#999999] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
					style={{
						color: props.isActiveFn(props.item) ? "#ffffff" : undefined,
						backgroundColor: props.isActiveFn(props.item)
							? "#128f5f"
							: undefined,
					}}
					onClick={() => {
						if (!props.isActiveFn(props.item)) {
							setExpanded(true);
							props.onClick(props.item);
						}
					}}
				>
					{props.item.title}
				</p>
				{typeof props.item.content !== "string" && (
					<div
						className="text-2xl font-mono px-2 ml-2 cursor-pointer hover:bg-[#00000022] dark:hover:bg-[#ffffff22] active:bg-black active:text-white rounded-lg"
						onClick={() => {
							setExpanded(!isExpanded);
						}}
					>
						{isExpanded ? "-" : "+"}
					</div>
				)}
			</div>
			{typeof props.item.content !== "string" && isExpanded && (
				<div className="ml-1 pl-1 mt-1 border-l-[1px] border-solid border-styleGray">
					{(props.item.content as DocPageGroup).pages.flatMap((it) => {
						return (
							<MenuItem
								onClick={props.onClick}
								isActiveFn={props.isActiveFn}
								item={it}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
