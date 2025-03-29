"use client";
import { useEffect, useState } from "react";

// actions
import { createTodo, getTodos, TodosRow } from "@/app/actions/todos-action";

// scss
import styles from "@/components/common/navigation/SideNavigation.module.scss";

// sahdcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dot, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SideNavigation() {
  const [todos, setTodos] = useState<TodosRow[] | null>([]);
  const router = useRouter();

  // create
  const onCreate = async () => {
    const { data, error, status } = await createTodo({
      title: "",
      contents: JSON.stringify([]),
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
    });
    // 에러 발생시
    if (error) {
      toast.error("데이터 추가 실패", {
        description: `데이터 추가에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터 추가 성공", {
      description: "데이터 추가에 성공하였습니다",
      duration: 3000,
    });
    console.log("등록된 id ", data.id);
    // 데이터 추가 성공시 할일 등록창으로 이동시킴
    // http://localhost:3000/create/ [data.id] 로 이동
    router.push(`/create/${data.id}`);
  };

  const fetchGetTodos = async () => {
    const { data, error, status } = await getTodos();
    // 에러 발생시
    if (error) {
      toast.error("데이터조회실패", {
        description: `데이터조회에 실패하였습니다. ${error.message}`,
        duration: 3000,
      });
      return;
    }
    // 최종 데이터
    toast.success("데이터 조회 성공", {
      description: "데이터조회에 성공하였습니다",
      duration: 3000,
    });

    setTodos(data);
  };

  useEffect(() => {
    fetchGetTodos();
  }, []);
  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.container_searchBox}>
        <Input
          type="text"
          placeholder="검색어를 입력하세요."
          className="focus-visible:right"
        />
        <Button variant={"outline"} size={"icon"}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {/* page 추가 버튼 */}
      <div className={styles.container_buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 border-orange-400 hover:bg-orange-50 hover:text-orange-500"
        >
          Add New Page
        </Button>
      </div>
      {/* 추가 항목 출력 영역 */}
      <div className={styles.container_todos}>
        <div className={styles.container_todos_label}>Your Todo</div>
        <div className={styles.container_todos_list}>
          {todos!.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-2 bg-[#f5f5f4] rounded-sm cursor-pointer"
            >
              <Dot className="mr-1 text-green-400" />
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
