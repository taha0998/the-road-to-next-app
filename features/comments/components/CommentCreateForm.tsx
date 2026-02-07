// "use client";
// import { useActionState } from "react";

// import { Form } from "@/components/form/Form";
// import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { createComment } from "@/features/ticket/actions/comment/createComment";

// type CommentCreateFormProps = {
//   ticketId: string;
// };

// const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
//   const [actionState, action] = useActionState(
//     createComment.bind(null, ticketId),
//     EMPTY_ACTION_STATE,
//   );
//   return (
//     <>
//       <Form
//         actionState={actionState}
//         action={action}
//         className="grid w-full gap-3"
//       >
//         <Textarea
//           id="content"
//           name="content"
//           placeholder="What's on your mind..."
//           className="h-20  md:text-[16px]"
//         />
//         <Button>
//           <p>Comment</p>
//         </Button>
//       </Form>
//     </>
//   );
// };

// export { CommentCreateForm };
