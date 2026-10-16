import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { IconName } from "../../assets/icons";
import { tokens } from "../../theme/tokens";
import { Button } from "../ui/controls/Button";
import { GradientBezel } from "../ui/surfaces/GradientBezel";
import { GradientSilhouette } from "../ui/surfaces/GradientSilhouette";
import { Icon } from "../ui/Icon";

const pendingTabs: readonly { label: string; icon: IconName }[] = [
  { label: "Map", icon: "map" },
  { label: "Cart", icon: "cart" },
  { label: "Profile", icon: "profile" },
  { label: "Documents", icon: "document" },
];

export function FloatingTabBar() {
  const insets = useSafeAreaInsets();
  return (
    <View
      testID="bottom-navigation"
      style={[styles.position, { paddingBottom: insets.bottom }]}
    >
      <GradientSilhouette shape="navigation" />
      <View style={styles.bar}>
        <View
          accessibilityRole="tablist"
          className="flex-row items-center justify-between"
        >
          <Button
            variant="plain"
            accessibilityRole="tab"
            accessibilityLabel="Bikes"
            aria-selected={true}
            style={styles.active}
          >
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, styles.activeSurface]}
            >
              <GradientBezel
                radius={tokens.radii.control}
                borderWidth={tokens.bezel.borderWidth}
                fill={tokens.bezel.active}
                border={tokens.bezel.border}
              />
            </View>
            <View pointerEvents="none" style={styles.activeIcon}>
              <Icon name="bike" width={28} height={28} />
            </View>
          </Button>
          {pendingTabs.map((tab) => (
            <Button
              key={tab.icon}
              variant="plain"
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              disabled={tab.label !== "Cart"}
              onPress={
                tab.label === "Cart" ? () => router.push("/cart") : undefined
              }
              style={styles.inactive}
            >
              <Icon
                name={tab.icon}
                width={20}
                height={20}
                color="white"
                fillOpacity={1}
                opacity={0.6}
              />
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  position: { position: "absolute", left: 0, right: 0, bottom: 0 },
  bar: {
    minHeight: tokens.list.navHeight,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    justifyContent: "center",
  },
  active: {
    width: tokens.list.navTileWidth,
    height: tokens.sizes.control,
    paddingHorizontal: 0,
    transform: [{ translateY: -tokens.spacing.sm }],
  },
  activeSurface: {
    top: (tokens.sizes.control - tokens.list.navTileHeight) / 2,
    bottom: (tokens.sizes.control - tokens.list.navTileHeight) / 2,
    borderRadius: tokens.radii.control,
    boxShadow: tokens.shadows.raised,
    transform: [{ skewY: tokens.list.cardTilt }],
  },
  activeIcon: { zIndex: 1 },
  inactive: {
    width: tokens.list.navTileWidth,
    height: tokens.sizes.control,
    paddingHorizontal: 0,
    opacity: 1,
  },
});
