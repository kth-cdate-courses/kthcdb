import { prisma } from "@/utilities/db";
import { resend } from "@/utilities/resend";
import RaycastMagicLinkEmail from "@emails/magic-link-login";
import { DateTime } from "luxon";

export async function createAuthEmail({
  email,
  userId,
  ...rest
}: { userId: string; email: string } & Omit<
  Partial<Parameters<typeof resend.emails.send>[0]>,
  "react"
>) {
  const createUrl = (token: string) =>
    `${Bun.env.API_URL}/auth/verify?token=${token}`;

  const token = await prisma.token.create({
    data: {
      userId,
      type: "login",
      token: crypto.randomUUID(),
      expiresAt: DateTime.now().plus({ hours: 2 }).toISO(),
    },
  });

  if (token == null) throw new Error("Failed to create token");

  const result = await resend.emails.send({
    from: "noreply@kthcdb.hallkvi.st",
    to: email,
    subject: "KTHcdb Verify email",
    ...rest,
    react: <RaycastMagicLinkEmail magicLink={createUrl(token.token)} />,
  });
}
